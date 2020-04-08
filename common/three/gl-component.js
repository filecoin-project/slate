import * as THREE from "three";

import OrbitControls from "~/common/three/orbital.js";
import GlobePoints from "~/common/three/points-3.json";

const convertFlatCoordsToSphereCoords = ({ globe, x, y }) => {
  let latitude = ((x - globe.width) / globe.width) * -180;
  let longitude = ((y - globe.height) / globe.height) * -90;
  latitude = (latitude * Math.PI) / 180;
  longitude = (longitude * Math.PI) / 180;
  const radius = Math.cos(longitude) * globe.radius;

  return {
    x: Math.cos(latitude) * radius,
    y: Math.sin(longitude) * globe.radius,
    z: Math.sin(latitude) * radius,
  };
};

const getViewportData = (width, height) => {
  const viewSize = height;
  const aspectRatio = width / height;

  return {
    viewSize: viewSize,
    aspectRatio: aspectRatio,
    left: (-aspectRatio * viewSize) / 2,
    right: (aspectRatio * viewSize) / 2,
    top: viewSize / 2,
    bottom: viewSize / -2,
    near: -2048,
    far: 2048,
  };
};

export default class GLComponent {
  constructor(props) {
    this.state = {
      mountedNodes: [],
      width: props.width,
      height: props.height,
      scene: undefined,
      renderer: undefined,
      container: undefined,
      camera: undefined,
      controls: undefined,
      measurements: undefined,
      ...props,
    };
  }

  setState(newProps) {
    this.state = { ...this.state, ...newProps };
  }

  unmount() {
    this.state.mountedNodes = null;
    this.state.width = null;
    this.state.height = null;
    this.state.scene = null;
    this.state.renderer = null;
    this.state.container = null;
    this.state.camera = null;
    this.state.controls = null;
    this.state.measurements = null;
    this.render = () => {
      console.log("Error: If this is getting called, that is bad.");
    };
  }

  async mount() {
    this.state.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.state.renderer.shadowMap.enabled = true;
    this.state.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.state.renderer.physicallyBasedShading = true;
    this.state.renderer.setClearColor(0x000000, 0);
    this.state.renderer.setPixelRatio(window.devicePixelRatio);
    this.state.renderer.setSize(this.state.width, this.state.height);
    this.state.scene = new THREE.Scene();
    this.state.container.appendChild(this.state.renderer.domElement);

    const viewport = getViewportData(this.state.width, this.state.height);

    this.state.camera = new THREE.OrthographicCamera(
      viewport.left,
      viewport.right,
      viewport.top,
      viewport.bottom,
      viewport.near,
      viewport.far
    );

    this.state.camera.position.x = 0.2;
    this.state.camera.position.y = 0.25;
    this.state.camera.position.z = 0.2;

    this.state.controls = new OrbitControls(
      this.state.camera,
      this.state.renderer.domElement
    );

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x888888, 0.9);
    this.state.scene.add(hemisphereLight);

    const ambientLight = new THREE.AmbientLight(0x888888, 0.7);
    this.state.scene.add(ambientLight);
  }

  firstRender() {
    const mergedGeometry = new THREE.Geometry();
    const pointGeometry = new THREE.SphereGeometry(2, 1, 1);
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: "#0047FF",
    });

    const { points } = GlobePoints;
    for (let point of points) {
      const { x, y, z } = convertFlatCoordsToSphereCoords({
        x: point.x,
        y: point.y,
        globe: { radius: 188, width: 4098 / 2, height: 1968 / 2 },
      });

      pointGeometry.translate(x, y, z);
      mergedGeometry.merge(pointGeometry);
      pointGeometry.translate(-x, -y, -z);
    }

    const globeShape = new THREE.Mesh(mergedGeometry, pointMaterial);
    this.state.mountedNodes.push(globeShape);
    this.state.scene.add(globeShape);
  }

  axis = new THREE.Vector3(0, 1, 0).normalize();

  render() {
    this.state.mountedNodes.forEach((n) => {
      const object = this.state.scene.getObjectById(n.id);
      object.rotateOnAxis(this.axis, Math.PI * 0.001);
    });

    this.state.renderer.render(this.state.scene, this.state.camera);
  }
}
