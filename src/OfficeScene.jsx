import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Html, OrbitControls, ContactShadows, useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

function WindowGrid({ x, y, z, rows=4, cols=7, width=5.8, height=4.1 }) {
  const panes=[]
  for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) panes.push(
    <mesh key={`${r}-${c}`} position={[x-width/2+(c+.5)*width/cols,y-height/2+(r+.5)*height/rows,z]}>
      <boxGeometry args={[width/cols-.07,height/rows-.08,.035]}/>
      <meshPhysicalMaterial color={(r+c)%4===0?'#c6e7ee':'#8ebdcb'} roughness={0.22} metalness={0.15} transparent opacity={0.78}/>
    </mesh>)
  return <group>{panes}</group>
}
function Office({ onEnter }) {
  return <group>
    {/* landscaped podium */}
    <mesh position={[0,.1,-5]} receiveShadow><boxGeometry args={[15,.3,10]}/><meshStandardMaterial color="#d8e4e1"/></mesh>
    {/* main glass building */}
    <mesh position={[0,3.25,-7]} castShadow receiveShadow><boxGeometry args={[10,6.2,4.2]}/><meshStandardMaterial color="#a6c9d0" roughness={.28} metalness={.18} transparent opacity={.24}/></mesh>
    <mesh position={[0,6.4,-7]} castShadow><boxGeometry args={[10.5,.22,4.6]}/><meshStandardMaterial color="#263d4c" metalness={.4} roughness={.3}/></mesh>
    <mesh position={[0,.35,-7]}><boxGeometry args={[10.4,.35,4.5]}/><meshStandardMaterial color="#273d4a"/></mesh>
    {/* front mullions */}
    {Array.from({length:9},(_,i)=><mesh key={i} position={[-4.7+i*1.175,3.25,-4.86]}><boxGeometry args={[.07,6,.08]}/><meshStandardMaterial color="#f0f6f5" metalness={.55}/></mesh>)}
    {Array.from({length:5},(_,i)=><mesh key={i} position={[0,.55+i*1.22,-4.86]}><boxGeometry args={[9.7,.055,.08]}/><meshStandardMaterial color="#eff8f7" metalness={.5}/></mesh>)}
    {/* entrance */}
    <mesh position={[-.72,1.35,-4.78]}><boxGeometry args={[1.25,2.55,.08]}/><meshPhysicalMaterial color="#d8eff1" transparent opacity={.55} roughness={.15}/></mesh>
    <mesh position={[.72,1.35,-4.78]}><boxGeometry args={[1.25,2.55,.08]}/><meshPhysicalMaterial color="#d8eff1" transparent opacity={.55} roughness={.15}/></mesh>
    <mesh position={[0,2.72,-4.73]}><boxGeometry args={[3.1,.1,.14]}/><meshStandardMaterial color="#20394a"/></mesh>
    <mesh position={[0,2.95,-4.65]}><boxGeometry args={[4.4,.75,.18]}/><meshStandardMaterial color="#ffffff" roughness={.35}/></mesh>
    <Html position={[0,2.96,-4.52]} center transform distanceFactor={7}>
      <div className="building-sign"><img src="/internlytic-logo.jpg" alt="Internlytic Technologies logo"/></div>
    </Html>
    {/* sidewalk */}
    <mesh position={[0,.04,-2.6]} receiveShadow><boxGeometry args={[12,.12,4.5]}/><meshStandardMaterial color="#c9d5d2"/></mesh>
    {/* entry steps */}
    {[0,1,2].map(i=><mesh key={i} position={[0,.12+i*.09,-3.65+i*.34]}><boxGeometry args={[4.4,.12,.42]}/><meshStandardMaterial color="#edf2ef"/></mesh>)}
    {/* trees */}
    {[-6,6].map((x,i)=><group key={i} position={[x,0,-3.5]}>
      <mesh position={[0,.8,0]}><cylinderGeometry args={[.13,.2,1.6,8]}/><meshStandardMaterial color="#795b45"/></mesh>
      <mesh position={[0,2,0]}><icosahedronGeometry args={[1.1,1]}/><meshStandardMaterial color={i?'#8ebd9b':'#7ea98a'} roughness={1}/></mesh>
      <mesh position={[.35,2.55,.1]}><icosahedronGeometry args={[.7,1]}/><meshStandardMaterial color="#a3c9a5" roughness={1}/></mesh>
    </group>)}
    {/* low planters */}
    {[-4.5,4.5].map(x=><group key={x} position={[x,.2,-4.2]}>
      <mesh><boxGeometry args={[1.1,.4,1.1]}/><meshStandardMaterial color="#879e96"/></mesh>
      <mesh position={[0,.5,0]}><sphereGeometry args={[.48,12,10]}/><meshStandardMaterial color="#7daa8d"/></mesh>
    </group>)}
  </group>
}
function Road() {
 return <group>
  <mesh position={[0,-.12,3]} receiveShadow><boxGeometry args={[200,.2,200]}/><meshStandardMaterial color="#dfe9e5"/></mesh>
  <mesh position={[0,-.01,8]} receiveShadow><boxGeometry args={[13,.08,24]}/><meshStandardMaterial color="#48555b" roughness={.95}/></mesh>
  <mesh position={[0,.04,8]}><boxGeometry args={[.08,.02,24]}/><meshStandardMaterial color="#f5f1dc"/></mesh>
  {[-5.3,5.3].map(x=><mesh key={x} position={[x,.04,8]}><boxGeometry args={[.08,.02,24]}/><meshStandardMaterial color="#f8faf5"/></mesh>)}
  {Array.from({length:8},(_,i)=><mesh key={i} position={[0,.045,1+i*2.8]}><boxGeometry args={[.22,.025,1.15]}/><meshStandardMaterial color="#f6f5e9"/></mesh>)}
 </group>
}
function ProceduralWalker() {
 const root=useRef(), leftLeg=useRef(), rightLeg=useRef(), leftArm=useRef(), rightArm=useRef()
 useFrame((state,delta)=>{
  if(!root.current)return
  const t=state.clock.elapsedTime
  root.current.position.z=THREE.MathUtils.damp(root.current.position.z, t<12? 5.5-(t/12)*8.8 : -3.3, 1.1, delta)
  root.current.position.x=THREE.MathUtils.damp(root.current.position.x, 0, 1.5, delta)
  const swing=t<12?Math.sin(t*5.4)*.48:0
  if(leftLeg.current)leftLeg.current.rotation.x=swing
  if(rightLeg.current)rightLeg.current.rotation.x=-swing
  if(leftArm.current)leftArm.current.rotation.x=-swing*.65
  if(rightArm.current)rightArm.current.rotation.x=swing*.65
 })
 return <group ref={root} position={[0,0,5.5]}>
  <mesh position={[0,1.58,0]} castShadow><capsuleGeometry args={[.22,.55,5,10]}/><meshStandardMaterial color="#263b4d" roughness={.7}/></mesh>
  <mesh position={[0,2.22,0]} castShadow><sphereGeometry args={[.19,18,16]}/><meshStandardMaterial color="#c99472" roughness={.85}/></mesh>
  <mesh position={[0,2.38,0]}><sphereGeometry args={[.195,16,12,0,Math.PI*2,0,Math.PI*.48]}/><meshStandardMaterial color="#25303a"/></mesh>
  <group ref={leftArm} position={[-.27,1.78,0]}><mesh position={[0,-.28,0]} rotation={[0,0,-.12]} castShadow><capsuleGeometry args={[.075,.48,4,8]}/><meshStandardMaterial color="#253d52"/></mesh></group>
  <group ref={rightArm} position={[.27,1.78,0]}><mesh position={[0,-.28,0]} rotation={[0,0,.12]} castShadow><capsuleGeometry args={[.075,.48,4,8]}/><meshStandardMaterial color="#253d52"/></mesh></group>
  <group ref={leftLeg} position={[-.12,1.25,0]}><mesh position={[0,-.48,0]} castShadow><capsuleGeometry args={[.085,.68,4,8]}/><meshStandardMaterial color="#263b4d"/></mesh><mesh position={[0,-.86,.1]}><boxGeometry args={[.17,.12,.32]}/><meshStandardMaterial color="#202a32"/></mesh></group>
  <group ref={rightLeg} position={[.12,1.25,0]}><mesh position={[0,-.48,0]} castShadow><capsuleGeometry args={[.085,.68,4,8]}/><meshStandardMaterial color="#263b4d"/></mesh><mesh position={[0,-.86,.1]}><boxGeometry args={[.17,.12,.32]}/><meshStandardMaterial color="#202a32"/></mesh></group>
  <mesh position={[.36,1.45,-.08]} rotation={[0,0,-.1]} castShadow><boxGeometry args={[.34,.43,.13]}/><meshStandardMaterial color="#35434c" roughness={.7}/></mesh>
 </group>
}

function RiggedWalker() {
 const root=useRef()
 const { scene, animations }=useGLTF('/realistic-walker.glb')
 const { actions }=useAnimations(animations, root)
 React.useEffect(()=>{
   const first=Object.values(actions).find(Boolean)
   if(first){first.reset().fadeIn(.25).play(); return ()=>first.fadeOut(.2)}
 },[actions])
 useFrame((state,delta)=>{
  if(!root.current)return
  const t=state.clock.elapsedTime
  root.current.position.z=THREE.MathUtils.damp(root.current.position.z,t<12?5.5-(t/12)*8.8:-3.3,1.1,delta)
  root.current.position.x=THREE.MathUtils.damp(root.current.position.x,0,1.5,delta)
 })
 return <group ref={root} position={[0,0,5.5]} scale={1.15}>
   <primitive object={scene} />
 </group>
}

class ModelFallbackBoundary extends React.Component {
 constructor(props){super(props);this.state={failed:false}}
 static getDerivedStateFromError(){return {failed:true}}
 componentDidCatch(){/* Missing or invalid optional GLB: keep the scene usable. */}
 render(){return this.state.failed?this.props.fallback:this.props.children}
}
function Walker(){
 return <ModelFallbackBoundary fallback={<ProceduralWalker/>}>
  <Suspense fallback={<ProceduralWalker/>}><RiggedWalker/></Suspense>
 </ModelFallbackBoundary>
}
export default function OfficeScene({ playing=true }) {
 return <div className="scene-canvas">
  <Canvas shadows dpr={[1,1.5]} camera={{position:[10,7,15],fov:42}} gl={{antialias:true, powerPreference:'high-performance'}}>
   <color attach="background" args={['#dcebea']}/>
   <fog attach="fog" args={['#dcebea',18,48]}/>
   <ambientLight intensity={0.85}/><hemisphereLight args={['#e7f5ff','#68735f',1.05]}/>
   <directionalLight position={[8,12,5]} intensity={2.4} castShadow shadow-mapSize={[1536,1536]}/><directionalLight position={[-7,7,-6]} intensity={0.65} color={'#d9f2ff'}/>
   <Environment preset="city"/>
   <group position={[0,0,0]}><Road/><Office/><Walker/></group>
   <ContactShadows position={[0,.01,1]} opacity={.24} scale={25} blur={2.5} far={8}/>
   <OrbitControls enablePan={false} minDistance={10} maxDistance={24} minPolarAngle={Math.PI/3.5} maxPolarAngle={Math.PI/2.1} target={[0,2,-2]} autoRotate={false}/>
  </Canvas>
 </div>
}