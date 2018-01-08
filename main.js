let a = 0;
let cones = [];
const recursiveLimit = 4;
let recursiveCount = 0;
let SEP = 2;

let vm = new Vue({
    el : "#vue",
    data : {
        sep : SEP,
        limit : recursiveLimit,
        count : 0,
        coneCount : 1
    }
})


 
function setup() {
    let canvas = createCanvas(600,600,WEBGL);
    canvas.parent('app');
    ambientLight(100);
    directionalLight(120, 120, 120, -1, -1, 1);
    ambientMaterial(230, 210, 255, 255);
    noStroke();
    resetCone();
}
 
function mousePressed() {
    ++recursiveCount;
    if (recursiveCount >= vm.limit) {
        resetCone();
        vm.sep++;
        return;
    }
    let next = [];
    cones.forEach(cone => {
        let newCones = cone.generate();
        next = concat(next, newCones);
    });
    cones = next;
    vm.count = recursiveCount;
    vm.coneCount = cones.length;
}
 
function draw() {
    camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
    background(30, 30, 60);
    //rotateX(a);
    rotateY(mouseX * 0.01);
    rotateZ(mouseY * 0.01);
    cones.forEach(cone => cone.show());
    a += 0.01;
}
 
function resetCone() {
    cones = [new Cone(0, 0, 0, 300)];
    recursiveCount = 0;
    vm.count = recursiveCount;
    vm.coneCount = 1;
}
 

class Cone{
    constructor(x, y, z, r_){
        this.pos = createVector(x, y , z);
        this.r = r_;
    }

    generate(){
        let newCones = [];
        newCones = [
            new Cone(this.pos.x , this.pos.y + this.r / 2 , this.pos.z , this.r / 2)
        ];
        for(let i = 0; i < vm.sep; i++){
            newCones.push(new Cone(this.pos.x + this.r * 0.5 * sin(TWO_PI * i / vm.sep), this.pos.y - this.r  /2 , this.pos.z + this.r * 0.5 * cos(TWO_PI * i / vm.sep) , this.r / 2))
        }

        return newCones;
    }

    show(){
        push();
            translate(this.pos.x, this.pos.y, this.pos.z);
            cone(this.r , this.r * 2);
        pop();
    }
}