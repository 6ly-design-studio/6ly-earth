/**
 * @author 6LY Design Studio / https://6ly.ca/
 * @author John Morrison / http://jowimo.com/
 */

/**
 *  MIT License
 *
 *  Copyright (c) 2019, John Morrison, 6LY Design Studio, https://6ly.ca
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 */

// Locales
var locales = [
    ['Toronto',          43.6532,  -79.3832],
    ['New York',         40.7128,  -74.0060],
    ['London',           51.5074,    0.1278],
    ['Zurich',           47.3769,    8.5417],
    ['Thiene',           45.7070,   11.4774],
    ['Cape Town',       -33.9249,   18.4241],
    ['Johannesburg',    -26.2041,   28.0473],
    ['Sydney',          -33.8688,  151.2093],
    ['Beijing',          39.9042,  116.4074],
    ['Dubai',            25.2048,   55.2708]
];

// Earth params
var earth_radius          = 0.5,
    earth_cloudAltitude   = 0.002,
    earth_cloudsCycleFactor = 1,
    earth_segments        = 48,
    earth_rotation        = 6;  

// Control params
var passiveEarthRotationFactor = 0.001,
    passiveEarthRotation = 0.001,
    mouseSensitivity = 0.1,
    wheelSensitivity = 0.0002,
    dragDamping = 0.94,
    maxDragVelocity = 25,
    cameraMaxZoom = 1.85,
    cameraMinZoom = 0.6;

// Theme params
var theme_galaxy, theme_galaxyMap, theme_galaxyRadius, theme_galaxyOpacity, theme_docBackground, theme_earthMap, theme_earthShininess, theme_earthBumpScale, theme_earthBumpMap, theme_earthSpecular, theme_earthSpecularMap, theme_clouds, theme_cloudsMaxOpacity, theme_cloudsMap, theme_lights_i, theme_lights_ambient, theme_lights_directional, theme_cubes_color;


//// SPHERICAL LIST => CARTESIAN LIST
function StC(radius, latitude, longitude) {
    var r = radius;
    var θ = latitude * Math.PI / 180;
    var ϕ = longitude * Math.PI / 180;

    return [
        r*Math.cos(θ)*Math.sin(ϕ),
        r*Math.cos(θ)*Math.cos(ϕ),
        r*Math.sin(θ)
    ];
}

function theme_set_theme(i) {
    switch(i) {
        case 0:
            theme_galaxy = true;
            theme_galaxyMap = 'universe.jpg';
            theme_galaxyRadius = 10*earth_radius;
            theme_galaxyOpacity = 0.67;
            theme_docBackground = '#000000';
            theme_earthMap = 'earth-color.jpg';
            theme_earthShininess = 10;
            theme_earthBumpScale = 0.004;
            theme_earthBumpMap = 'earth-bump.png';
            theme_earthSpecular = 0xeeefff;
            theme_earthSpecularMap = 'earth-ocean.png';
            theme_clouds = true;
            theme_cloudsMaxOpacity = 0.95;
            theme_cloudsMap = 'earth-clouds.png';
            theme_lights_i = 0;
            theme_lights_ambient = [
                [
                    [0x303030]
                ]
            ];
            theme_lights_directional = [
                [
                    [0xeeeeff, 0.9, -2.5, 2, 3],
                    [0xeeeeff, 0.4, -2, 2, -2],
                    [0xff4400, 2, 2, -1, -3]
                ]
            ];
            theme_cubes_color = 0xffffff;
            break;
        case 1:
            theme_galaxy = true;
            theme_galaxyMap = 'universe.jpg';
            theme_galaxyRadius = 10*earth_radius;
            theme_galaxyOpacity = 0.67;
            theme_docBackground = '#000000';
            theme_earthMap = 'earth-color-2.jpg';
            theme_earthShininess = 1;
            theme_earthBumpScale = 0.004;
            theme_earthBumpMap = 'earth-bump.png';
            theme_earthSpecular = 0x0000ff;
            theme_earthSpecularMap = 'earth-ocean.png';
            theme_clouds = true;
            theme_cloudsMaxOpacity = 0.95;
            theme_cloudsMap = 'earth-clouds-light.png';
            theme_lights_i = 0;
            theme_lights_ambient = [
                [
                    [0x888888]
                ]
            ];
            theme_lights_directional = [
                [
                    [0xeeeeff, 0.5, -2.5, 2, 3],
                ]
            ];
            theme_cubes_color = 0x000000;
            break;
        case 2:
            theme_galaxy = false;
            theme_galaxyMap = 'universe.jpg';
            theme_galaxyRadius = 10*earth_radius;
            theme_galaxyOpacity = 0.67;
            theme_docBackground = '#7d7c71';
            theme_earthMap = 'earth-political.png';
            theme_earthShininess = 3;
            theme_earthBumpScale = 0.0025;
            theme_earthBumpMap = 'earth-bump.png';
            theme_earthSpecular = 0xffffff;
            theme_earthSpecularMap = 'earth-ocean.png';
            theme_clouds = false;
            theme_cloudsMaxOpacity = 0.95;
            theme_cloudsMap = 'earth-clouds-light.png';
            theme_lights_i = 0;
            theme_lights_ambient = [
                [
                    [0x555555]
                ]
            ];
            theme_lights_directional = [
                [
                    [0xffffff, 0.6, -2, 2, 4],
                ]
            ];
            theme_cubes_color = 0xffffff;
            break;
        case 3:
            theme_galaxy = false;
            theme_galaxyMap = 'universe.jpg';
            theme_galaxyRadius = 10*earth_radius;
            theme_galaxyOpacity = 0.67;
            theme_docBackground = '#000000';
            theme_earthMap = 'earth-color-4.png';
            theme_earthShininess = 3;
            theme_earthBumpScale = 0.002;
            theme_earthBumpMap = 'earth-blank.png';
            theme_earthSpecular = 0xffffff;
            theme_earthSpecularMap = 'earth-blank.png';
            theme_clouds = false;
            theme_cloudsMaxOpacity = 0.95;
            theme_cloudsMap = 'earth-clouds-light.png';
            theme_lights_i = 0;
            theme_lights_ambient = [
                [
                    [0xffffff]
                ]
            ];
            theme_lights_directional = [
                [
                ]
            ];
            theme_cubes_color = 0x000000;
            break;
        default:
            theme_galaxy = true;
            theme_galaxyMap = 'universe.jpg';
            theme_galaxyRadius = 10*earth_radius;
            theme_galaxyOpacity = 0.67;
            theme_docBackground = '#000000';
            theme_earthMap = 'earth-color.jpg';
            theme_earthShininess = 10;
            theme_earthBumpScale = 0.002;
            theme_earthBumpMap = 'earth-bump.png';
            theme_earthSpecular = 0xeeefff;
            theme_earthSpecularMap = 'earth-ocean.png';
            theme_clouds = true;
            theme_cloudsMaxOpacity = 0.95;
            theme_cloudsMap = 'earth-clouds.png';
            theme_lights_i = 0;
            theme_lights_ambient = [
                [
                    [0xffffff]
                ]
            ];
            theme_lights_directional = [
                [
                ]
            ];
            theme_cubes_color = 0xffffff;
    }
    
    document.getElementById('docBody').style = 'background: ' + theme_docBackground + ';';
}

// Galaxy object builder
function genGalaxy3() {

    var galaxyMap = THREE.ImageUtils.loadTexture( 'images/' + theme_galaxyMap );
    galaxyMap.anisotropy = 16;

    return new THREE.Mesh(
        new THREE.SphereBufferGeometry( theme_galaxyRadius, earth_segments, earth_segments ),			
        new THREE.MeshBasicMaterial({
            map:            galaxyMap,
            side:           THREE.BackSide,
            transparent:    true,
            opacity:        theme_galaxyOpacity
        })
    );		
}

// Earth object builder
function genEarth3() {

    var earthMap = THREE.ImageUtils.loadTexture( 'images/' + theme_earthMap );
    earthMap.anisotropy = 16;

    return new THREE.Mesh(
        new THREE.SphereBufferGeometry(earth_radius, earth_segments, earth_segments),
        new THREE.MeshPhongMaterial({
            map:         earthMap,
            bumpMap:     THREE.ImageUtils.loadTexture( 'images/' + theme_earthBumpMap ),
            bumpScale:   theme_earthBumpScale,
            specularMap: THREE.ImageUtils.loadTexture( 'images/' + theme_earthSpecularMap ),
            specular:    theme_earthSpecular,
            shininess: theme_earthShininess
        })
    );
}

// Clouds object builder
function genEarthCloud3() {

    var cloudMap = THREE.ImageUtils.loadTexture( 'images/' + theme_cloudsMap );
    cloudMap.anisotropy = 16;
    
    return new THREE.Mesh(
        new THREE.SphereBufferGeometry( earth_radius + earth_cloudAltitude, earth_segments, earth_segments ),			
        new THREE.MeshPhongMaterial({
            map:         cloudMap,
            transparent: true,
            opacity: 0.95
        })
    );		
}



//////// PRIMARY 3D ENVIRONMENT

var webglEl = document.getElementById('webgl');

if (!Detector.webgl) {
    Detector.addGetWebGLMessage(webglEl);
}

var width, height;

var scene = new THREE.Scene();

width  = window.innerWidth;
height = window.innerHeight;

var camera = new THREE.PerspectiveCamera( 50, width / height, 0.01, 1000 );
camera.position.z = 1.5;

var renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
renderer.setClearColor( 0x000000, 0 );
renderer.setSize( width, height );

function updateCameraRender() {
    width  = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize( width, height );
}


//// Light objects

theme_set_theme(0);

var ambientLights = [];

var directionalLights = [];

function reset_scene_lights() {

    for (var i = 0; i < ambientLights.length; i++) {

        scene.remove(ambientLights[i]);

    }
    for (var i = 0; i < directionalLights.length; i++) {

        scene.remove(directionalLights[i]);

    }

    for (var i = 0; i < theme_lights_ambient[theme_lights_i].length; i++) {

        ambientLights[i] = new THREE.AmbientLight(theme_lights_ambient[theme_lights_i][i][0]);
        scene.add(ambientLights[i]);

    }

    for (var i = 0; i < theme_lights_directional[theme_lights_i].length; i++) {

        directionalLights[i] = new THREE.DirectionalLight(theme_lights_directional[theme_lights_i][i][0], theme_lights_directional[theme_lights_i][i][1]);
        directionalLights[i].position.set(theme_lights_directional[theme_lights_i][i][2],theme_lights_directional[theme_lights_i][i][3],theme_lights_directional[theme_lights_i][i][4]);
        scene.add(directionalLights[i]);

    }

}

reset_scene_lights();

//// Primary map objects

var galaxy, earth, clouds;

function reset_scene_objects_primary(initial) {

    if (initial != true) {

        scene.remove(galaxy);
        scene.remove(earth);
        scene.remove(clouds);

    }

    if (theme_galaxy) {
        galaxy = genGalaxy3();
    } else {
        galaxy = new THREE.Mesh(
            new THREE.SphereBufferGeometry( 0.01, 4, 4 ),
            new THREE.MeshBasicMaterial()
        );
    }
    galaxy.rotation.y = earth_rotation;

    earth = genEarth3();
    earth.rotation.y = earth_rotation; 


    if (theme_clouds) {
        clouds = genEarthCloud3();
    } else {
        clouds = new THREE.Mesh(
            new THREE.SphereBufferGeometry( 0.01, 4, 4 ),
            new THREE.MeshBasicMaterial()
        );
    }
    clouds.rotation.y = earth_rotation;

    scene.add(galaxy);
    scene.add(earth);
    scene.add(clouds);

}

reset_scene_objects_primary(true);



//// Curve objects

var curveObjects = [];

function cityCurve(ccindex, i, j) {

    var cV1 = StC(earth_radius, locales[i][1], - locales[i][2]);
    var cV4 = StC(earth_radius, locales[j][1], - locales[j][2]);
    var v1T = new THREE.Vector3( cV1[0], cV1[1], cV1[2] );
    var v4T = new THREE.Vector3( cV4[0], cV4[1], cV4[2] );
    var dVT = 2 * Math.pow((v1T.distanceTo(v4T)),4);
    var curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( cV1[1], cV1[2], cV1[0] ),
        new THREE.Vector3( 1.1*cV1[1]+ dVT*(cV1[1]+cV4[1]), 1.1*cV1[2]+ dVT*(cV1[2]+cV4[2]), 1.1*cV1[0]+ dVT*(cV1[0]+cV4[0]) ),
        new THREE.Vector3( 1.1*cV4[1]+ dVT*(cV4[1]+cV1[1]), 1.1*cV4[2]+ dVT*(cV4[2]+cV1[2]), 1.1*cV4[0]+ dVT*(cV4[0]+cV1[0]) ),
        new THREE.Vector3( cV4[1], cV4[2], cV4[0] )
    );

    var points = curve.getPoints( 50 );
    var geometry = new THREE.BufferGeometry().setFromPoints(points);

    var material = new THREE.LineBasicMaterial( { color : 0xff2233, transparent : true, opacity : 0.5 } );

    // Create the final object to add to the scene
    curveObjects[ccindex] = new THREE.Line( geometry, material );
    //scene.add(curveObjects[ccindex]);

}

var count = 0;
for (var i = 0; i < locales.length; i++) {
    for (var j = 0; j < locales.length; j++) {
        if (i != j) {
            cityCurve(count, i, j);
            count++;
        }
    }
}

//// Locale objects

var cubes = [];

function genLocales() {
    cubes = [];
    for (var i = 0; i < locales.length; i++) {
        var geometry = new THREE.SphereGeometry( 0.003, 4, 4 );
        var material = new THREE.MeshBasicMaterial( { 
            color:    theme_cubes_color
        } );
        cubes[i] = new THREE.Mesh( geometry, material );
        scene.add(cubes[i]);
    }
}

function reset_scene_objects_locales() {
    for (var i = 0; i < locales.length; i++) {
        scene.remove(cubes[i]);
        var geometry = new THREE.SphereGeometry( 0.003, 4, 4 );
        var material = new THREE.MeshBasicMaterial( { 
            color:    theme_cubes_color
        } );
        cubes[i] = new THREE.Mesh( geometry, material );
        scene.add(cubes[i]);
    }
}



//////// CONTROLS

var dX, dY, mdX, mdY, vVX, vVY, tdX, tdY;
dX = dY = mdX = mdY = vVX = vVY = tdX = tdY = 0;
var vVXmult = 1,
    vVYmult = 1,
    ZOOMmult = 1;

// Mouse move logic
function f_mm(event) {
    if (event.buttons == 1) {
        dX = event.clientX - mdX;
        dY = event.clientY - mdY;

        vVX += vVXmult*dX*mouseSensitivity;
        vVY += vVYmult*dY*mouseSensitivity;
    }

    mdX = event.clientX;
    mdY = event.clientY;
}

// Mouse wheel logic
function f_ow(event) {
    var dW = event.deltaY;
    camera.scale.z *= (1-ZOOMmult*dW*wheelSensitivity);
    if (camera.scale.z > cameraMaxZoom) {camera.scale.z = cameraMaxZoom;} else if (camera.scale.z < cameraMinZoom) {camera.scale.z = cameraMinZoom;}
}

// Touch move logic
function f_ts(event) {
    if (event.touches.length == 1) {
        tdX = event.touches[0].clientX;
        tdY = event.touches[0].clientY;
    }
}
function f_tm(event) {
    console.log(event)
    if (event.touches.length == 1) {
        dX = event.touches[0].clientX - tdX;
        dY = event.touches[0].clientY - tdY;

        vVX += vVXmult*dX*mouseSensitivity;
        vVY += vVYmult*dY*mouseSensitivity;
    }

    tdX = event.touches[0].clientX;
    tdY = event.touches[0].clientY;
}

function navMobileZoomIn() {
    camera.scale.z *= (1+ZOOMmult*500*wheelSensitivity);
    if (camera.scale.z > cameraMaxZoom) {camera.scale.z = cameraMaxZoom;} else if (camera.scale.z < cameraMinZoom) {camera.scale.z = cameraMinZoom;}
}

function navMobileZoomOut() {
    camera.scale.z *= (1-ZOOMmult*500*wheelSensitivity);
    if (camera.scale.z > cameraMaxZoom) {camera.scale.z = cameraMaxZoom;} else if (camera.scale.z < cameraMinZoom) {camera.scale.z = cameraMinZoom;}
}

document.getElementById('webgl').onmousemove  = f_mm,
document.getElementById('webgl').onmousewheel = f_ow,
document.getElementById('webgl').ontouchstart  = f_ts;
document.getElementById('webgl').ontouchmove  = f_tm;

setInterval(function(){
    if (Math.abs(vVX) > maxDragVelocity) {vVX = vVX/Math.abs(vVX)*maxDragVelocity;} else {vVX = dragDamping*vVX;}
    if (Math.abs(vVY) > maxDragVelocity) {vVY = vVY/Math.abs(vVY)*maxDragVelocity;} else {vVY = dragDamping*vVY;}

    if (vVX > 4) {passiveEarthRotation = passiveEarthRotationFactor;} else if (vVX < -4) {passiveEarthRotation = -passiveEarthRotationFactor;}

    earth.rotation.y += vVX/360/camera.scale.z;
    clouds.rotation.y += vVX/358/camera.scale.z;

    if (camera.position.y + vVY/500 > 1.45) {camera.position.y = 1.45;}
    else if (camera.position.y + vVY/500 < -1.45) {camera.position.y = -1.45;}
    else {camera.position.y += vVY/500;}

    camera.position.z = Math.sqrt(Math.pow(1.5,2) - Math.pow(camera.position.y,2));
    camera.rotation.x = -Math.asin(camera.position.y/1.5);

    if (width != window.innerWidth || height != window.innerHeight) {
        updateCameraRender();
    }
}, 20);



//////// RENDERING

webglEl.appendChild(renderer.domElement);

function render() {
    earth.rotation.y += passiveEarthRotation/camera.scale.z;
    galaxy.rotation.y = earth.rotation.y*4/3;
    clouds.rotation.y += passiveEarthRotation/camera.scale.z+0.0001;
    clouds.material.opacity = Math.min(2.5 - earth_cloudsCycleFactor*Math.pow(camera.scale.z,3/2), 0.96);
    for (var i = 0; i < locales.length; i++) {
        var j = StC(earth_radius, locales[i][1], - locales[i][2] - earth.rotation.y / Math.PI * 180);
        cubes[i].position.x = 1.001*j[1];
        cubes[i].position.y = 1.001*j[2];
        cubes[i].position.z = 1.001*j[0];
    }

    for (var i = 0; i < curveObjects.length; i++) {
        curveObjects[i].rotation.y = earth.rotation.y;
    }

    requestAnimationFrame(render);
    renderer.render(scene, camera);
}




//////// NAV CYCLES


// Theme cycle

var nav_themeCycle = ['1', '2', '3', '4'],
    nav_theme_i = 0,
    nav_theme = 'medium';

function nav_next_theme() {
    if (nav_theme_i + 1 == nav_themeCycle.length) {nav_theme_i = 0;} else {nav_theme_i += 1;}
    nav_theme = nav_themeCycle[nav_theme_i];
    document.getElementById('cycle-theme').innerHTML = 'Theme ' + nav_theme;

    theme_set_theme(nav_theme_i);

    reset_scene_lights();
    reset_scene_objects_primary();
    reset_scene_objects_locales();
}

document.getElementById('cycle-theme').parentNode.onclick = nav_next_theme;


// Spin cycle

var nav_spinCycle = ['medium', 'fast', 'very fast', 'off', 'slow'],
    nav_spin_i = 0,
    nav_spin = 'medium';

function nav_next_spin() {
    if (nav_spin_i + 1 == nav_spinCycle.length) {nav_spin_i = 0;} else {nav_spin_i += 1;}
    nav_spin = nav_spinCycle[nav_spin_i];
    document.getElementById('cycle-spin').innerHTML = 'Spin ' + nav_spin;

    if (nav_spin == 'off') {
        passiveEarthRotationFactor = 0;
        passiveEarthRotation = 0;
    } else if (nav_spin == 'slow') {
        passiveEarthRotationFactor = 0.0003;
        passiveEarthRotation = 0.0003;
    } else if (nav_spin == 'medium') {
        passiveEarthRotationFactor = 0.001;
        passiveEarthRotation = 0.001;
    } else if (nav_spin == 'fast') {
        passiveEarthRotationFactor = 0.007;
        passiveEarthRotation = 0.007;
    } else if (nav_spin == 'very fast') {
        passiveEarthRotationFactor = 0.05;
        passiveEarthRotation = 0.05;
    }
}

document.getElementById('cycle-spin').parentNode.onclick = nav_next_spin;


// Clouds cycle

var nav_cloudsCycle = ['dynamic', 'on', 'off'],
    nav_clouds_i = 0,
    nav_clouds = 'dynamic';

function nav_next_clouds() {
    if (nav_clouds_i + 1 == nav_cloudsCycle.length) {nav_clouds_i = 0;} else {nav_clouds_i += 1;}
    nav_clouds = nav_cloudsCycle[nav_clouds_i];
    document.getElementById('cycle-clouds').innerHTML = 'Clouds ' + nav_clouds;

    if (nav_clouds == 'off') {
        scene.remove(clouds);
    } else if (nav_clouds == 'on') {
        scene.add(clouds);
        earth_cloudsCycleFactor = 0;
    } else if (nav_clouds == 'dynamic') {
        scene.add(clouds);
        earth_cloudsCycleFactor = 1;
    }
}

document.getElementById('cycle-clouds').parentNode.onclick = nav_next_clouds;


// X Drag cycle

var nav_xdragCycle = ['enabled', 'disabled'],
    nav_xdrag_i = 0,
    nav_xdrag = 'enabled';

function nav_next_xdrag() {
    if (nav_xdrag_i + 1 == nav_xdragCycle.length) {nav_xdrag_i = 0;} else {nav_xdrag_i += 1;}
    nav_xdrag = nav_xdragCycle[nav_xdrag_i];
    document.getElementById('cycle-xdrag').innerHTML = 'LR drag ' + nav_xdrag;

    if (nav_xdrag == 'enabled') {
        vVXmult = 1;
    } else if (nav_xdrag == 'disabled') {
        vVXmult = 0;
    }
}

document.getElementById('cycle-xdrag').parentNode.onclick = nav_next_xdrag;


// Y Drag cycle

var nav_ydragCycle = ['enabled', 'disabled'],
    nav_ydrag_i = 0,
    nav_ydrag = 'enabled';

function nav_next_ydrag() {
    if (nav_ydrag_i + 1 == nav_ydragCycle.length) {nav_ydrag_i = 0;} else {nav_ydrag_i += 1;}
    nav_ydrag = nav_ydragCycle[nav_ydrag_i];
    document.getElementById('cycle-ydrag').innerHTML = 'UD drag ' + nav_ydrag;

    if (nav_ydrag == 'enabled') {
        vVYmult = 1;
    } else if (nav_ydrag == 'disabled') {
        vVYmult = 0;
    }
}

document.getElementById('cycle-ydrag').parentNode.onclick = nav_next_ydrag;


// Zoom cycle

var nav_zoomCycle = ['enabled', 'disabled'],
    nav_zoom_i = 0,
    nav_zoom = 'enabled';

function nav_next_zoom() {
    if (nav_zoom_i + 1 == nav_zoomCycle.length) {nav_zoom_i = 0} 
    else {nav_zoom_i += 1}
    nav_zoom = nav_zoomCycle[nav_zoom_i],
    document.getElementById('cycle-zoom').innerHTML = 'Zoom ' + nav_zoom;

    if (nav_zoom == 'enabled') {
        ZOOMmult = 1
    } else if (nav_zoom == 'disabled') {
        ZOOMmult = 0,
        camera.scale.z = 1
    }
}

document.getElementById('cycle-zoom').parentNode.onclick = nav_next_zoom;


// Nav toggle

function navToggle() {
    if (document.getElementById('docBody').classList == 'nav-toggle-on') {
        document.getElementById('docBody').classList = 'nav-toggle-off';
    } else {
        document.getElementById('docBody').classList = 'nav-toggle-on';
    }
}

if (width > 640) { navToggle() }


// Locales updating

function localesRemove(j) {
    for (var k = 0; k < locales.length; k++) {
        scene.remove(cubes[k]);
    }
    locales.splice(j,1);
    localesUpdate();
}

function localesUpdate() {

    document.getElementById('locales-list').innerHTML = '';
    for (var i = 0; i < locales.length; i++) {
        var localesListLatitude, localesListLongitude;
        if (locales[i][1] > 0) {localesListLatitude = Math.abs(locales[i][1]) + ' N'} else {localesListLatitude = Math.abs(locales[i][1]) + ' S'}
        if (locales[i][2] > 0) {localesListLongitude = Math.abs(locales[i][2]) + ' E'} else {localesListLongitude = Math.abs(locales[i][2]) + ' W'}
        document.getElementById('locales-list').innerHTML += " <div id='locales-list-"+i+"'><div>"+locales[i][0]+"</div><div>"+localesListLatitude+"</div><div>"+localesListLongitude+"</div><div onclick='localesRemove("+i+");'></div></div>";
    }
    genLocales();

}

localesUpdate();

render();