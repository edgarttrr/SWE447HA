var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = Detector.webgl? new THREE.WebGLRenderer( { antialias: true } ): new THREE.CanvasRenderer();

var blue = 0x84D0F0;
var yellow = 0xE8E209;
var purple = 0xB832D8;
var red =  0xE83A09;
var black = 0x201E1E;
var white = 0xEFE7E5;
var offWhite = 0xBDB1AE;
var darkPink = 0xF871B5;
var ligntPink = 0xED9DC5;
var offPink = 0xECBCD4;
var brown = 0x6D430E;
var darkBrown = 0xB07427;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 100;

var tubeGeometry = new THREE.CylinderGeometry(0.3,0.3,6,32);
var ballGeometry = new THREE.SphereGeometry(0.8,32,32);
var blueMaterial = new THREE.MeshBasicMaterial( { color: white } );
var yellowMaterial = new THREE.MeshBasicMaterial( { color: darkBrown } );
var purpleMaterial = new THREE.MeshBasicMaterial( { color: brown } );

var dna = new THREE.Object3D();
var holder = new THREE.Object3D();


for (var i = 0; i <= 40; i++) {
	var blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
	blueTube.rotation.z = 90 * Math.PI/180; 
	blueTube.position.x = -3;

	var yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial );
	yellowTube.rotation.z = 90 * Math.PI/180;
	yellowTube.position.x = 3;


	var ballRight = new THREE.Mesh( ballGeometry, purpleMaterial );
	ballRight.position.x = 6;

	var ballLeft = new THREE.Mesh( ballGeometry, purpleMaterial );
	ballLeft.position.x = -6;

	var row = new THREE.Object3D();
	row.add(blueTube);
	row.add(yellowTube);
	row.add(ballRight);
	row.add(ballLeft);

	row.position.y = i*1;
	row.rotation.y = 30*i * Math.PI/180;

	dna.add(row);

};


dna.position.y = -40;

scene.add(dna);

dna.position.y = -10;
holder.add(dna)
scene.add(holder);

var CubeConfigData = function() {
	this.zoom = 100;
};

var view = new CubeConfigData();
var gui = new dat.GUI();
gui.close();

gui.add( view, 'zoom', 0, 100 ).onChange( function(value) {
	camera.position.z = value;
});


var render = function () {

	requestAnimationFrame(render);
    
	holder.rotation.x += 0.00;
	holder.rotation.y += 0.01;
	renderer.render(scene, camera);
}

render();
