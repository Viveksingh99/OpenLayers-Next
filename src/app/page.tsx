import Demo from "@/components/Demo";
import MapComponent from "@/components/Map";

export default function Home() {
  return (
    <>
      <div className="px-10">
        <div>
          <h1 className="text-center text-3xl">OpenLayers Next Example</h1>
        </div>
        <div>
          <MapComponent />
        </div>
        <div>
          <h1 className="text-center text-3xl">OpenLayers Next Example</h1>
        </div>
        <div>
          <Demo />
        </div>
      </div>
    </>
  );
}
