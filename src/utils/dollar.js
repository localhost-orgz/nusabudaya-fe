export class Point {
   constructor(x, y) {
      this.X = x;
      this.Y = y;
   }
}

export class DollarRecognizer {
   constructor() {
      this.Unistrokes = [];
   }

   Recognize(points) {
      if (points.length < 2) return { Name: "No Match", Score: 0 };
      points = this.Resample(points, 64);
      points = this.RotateToZero(points);
      points = this.ScaleTo(points, 250);
      points = this.TranslateTo(points, new Point(0, 0));

      let b = +Infinity;
      let u = -1;
      for (let i = 0; i < this.Unistrokes.length; i++) {
         let d = this.DistanceAtBestAngle(points, this.Unistrokes[i], -45.0, +45.0, 2.0);
         if (d < b) {
            b = d;
            u = i;
         }
      }
      return u === -1 ? { Name: "Unknown", Score: 0 } : { Name: this.Unistrokes[u].Name, Score: 1.0 - b / (0.5 * Math.sqrt(250 * 250 + 250 * 250)) };
   }

   AddGesture(name, points) {
      this.Unistrokes.push(new Unistroke(name, points));
   }

   Resample(points, n) {
      let I = this.PathLength(points) / (n - 1);
      let D = 0.0;
      let newpoints = [points[0]];
      for (let i = 1; i < points.length; i++) {
         let d = this.Distance(points[i - 1], points[i]);
         if (D + d >= I) {
            let qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
            let qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
            let q = new Point(qx, qy);
            newpoints.push(q);
            points.splice(i, 0, q);
            D = 0.0;
         } else D += d;
      }
      if (newpoints.length === n - 1) newpoints.push(points[points.length - 1]);
      return newpoints;
   }

   RotateToZero(points) {
      let c = this.Centroid(points);
      let theta = Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
      return this.RotateBy(points, -theta);
   }

   RotateBy(points, theta) {
      let c = this.Centroid(points);
      let cos = Math.cos(theta);
      let sin = Math.sin(theta);
      let newpoints = [];
      for (let i = 0; i < points.length; i++) {
         let qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X;
         let qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
         newpoints.push(new Point(qx, qy));
      }
      return newpoints;
   }

   ScaleTo(points, size) {
      let B = this.BoundingBox(points);
      let newpoints = [];
      for (let i = 0; i < points.length; i++) {
         let qx = points[i].X * (size / B.Width);
         let qy = points[i].Y * (size / B.Height);
         newpoints.push(new Point(qx, qy));
      }
      return newpoints;
   }

   TranslateTo(points, pt) {
      let c = this.Centroid(points);
      let newpoints = [];
      for (let i = 0; i < points.length; i++) {
         let qx = points[i].X + pt.X - c.X;
         let qy = points[i].Y + pt.Y - c.Y;
         newpoints.push(new Point(qx, qy));
      }
      return newpoints;
   }

   DistanceAtBestAngle(points, T, a, b, threshold) {
      let x1 = 0.618 * a + 0.382 * b;
      let f1 = this.DistanceAtAngle(points, T, x1);
      let x2 = 0.382 * a + 0.618 * b;
      let f2 = this.DistanceAtAngle(points, T, x2);
      while (Math.abs(b - a) > threshold) {
         if (f1 < f2) {
            b = x2;
            x2 = x1;
            f2 = f1;
            x1 = 0.618 * a + 0.382 * b;
            f1 = this.DistanceAtAngle(points, T, x1);
         } else {
            a = x1;
            x1 = x2;
            f1 = f2;
            x2 = 0.382 * a + 0.618 * b;
            f2 = this.DistanceAtAngle(points, T, x2);
         }
      }
      return Math.min(f1, f2);
   }

   DistanceAtAngle(points, T, theta) {
      let newpoints = this.RotateBy(points, theta);
      return this.PathDistance(newpoints, T.Points);
   }

   Centroid(points) {
      let x = 0,
         y = 0;
      for (let i = 0; i < points.length; i++) {
         x += points[i].X;
         y += points[i].Y;
      }
      return new Point(x / points.length, y / points.length);
   }

   BoundingBox(points) {
      let minX = +Infinity,
         maxX = -Infinity,
         minY = +Infinity,
         maxY = -Infinity;
      for (let i = 0; i < points.length; i++) {
         minX = Math.min(minX, points[i].X);
         minY = Math.min(minY, points[i].Y);
         maxX = Math.max(maxX, points[i].X);
         maxY = Math.max(maxY, points[i].Y);
      }
      return { X: minX, Y: minY, Width: maxX - minX, Height: maxY - minY };
   }

   PathDistance(pts1, pts2) {
      let d = 0.0;
      for (let i = 0; i < pts1.length; i++) d += this.Distance(pts1[i], pts2[i]);
      return d / pts1.length;
   }

   PathLength(points) {
      let d = 0.0;
      for (let i = 1; i < points.length; i++) d += this.Distance(points[i - 1], points[i]);
      return d;
   }

   Distance(p1, p2) {
      let dx = p2.X - p1.X;
      let dy = p2.Y - p1.Y;
      return Math.sqrt(dx * dx + dy * dy);
   }
}

class Unistroke {
   constructor(name, points) {
      this.Name = name;
      const r = new DollarRecognizer();
      this.Points = r.Resample(points, 64);
      this.Points = r.RotateToZero(this.Points);
      this.Points = r.ScaleTo(this.Points, 250);
      this.Points = r.TranslateTo(this.Points, new Point(0, 0));
   }
}
