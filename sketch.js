// Definisi kelas Walker
class Walker {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
  }

  // Metode untuk menampilkan Walker di canvas
  display() {
    stroke(0);
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 48, 48); // Bentuk visual Walker (zombie)
  }

  // Metode untuk memperbarui posisi Walker
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset percepatan setelah diterapkan
  }

  // Metode untuk mengatur percepatan menuju karakter
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // Hitung vektor ke arah target
    desired.setMag(0.5); // Atur kecepatan maksimum
    let steer = p5.Vector.sub(desired, this.velocity);
    this.acceleration.add(steer);
  }

  // Metode untuk memeriksa batas canvas dan memantulkan Walker jika perlu
  checkEdges() {
    if (this.position.x > width || this.position.x < 0) {
      this.velocity.x *= -1;
    }
    if (this.position.y > height || this.position.y < 0) {
      this.velocity.y *= -1;
    }
  }
}

let walkers = []; // Array untuk menyimpan objek Walker

function setup() {
  createCanvas(800, 600);
  // Membuat objek Walker secara acak di canvas
  for (let i = 0; i < 10; i++) {
    walkers.push(new Walker(random(width), random(height)));
  }
}

function draw() {
  background(51);

  // Menampilkan dan memperbarui posisi karakter
  fill(0, 255, 0);
  ellipse(mouseX, mouseY, 32, 32); // Bentuk visual karakter

  // Memperbarui dan menampilkan setiap Walker (zombie)
  for (let walker of walkers) {
    walker.seek(createVector(mouseX, mouseY)); // Mengejar karakter
    walker.update();
    walker.checkEdges();
    walker.display();
  }
}
