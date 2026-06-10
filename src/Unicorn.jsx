import UnicornScene from "unicornstudio-react";

export default function Unicorn() {
  const handleLoad = () => {
    console.log("Scene loaded successfully!");
  };

  const handleError = (error) => {
    console.error("Scene loading failed:", error);
  };
  return (
     <UnicornScene
      jsonFilePath="/assets/landing_effect.json"
      width="100%"
      height="100%"
      scale={1}
      dpi={1.5}
      fps={60}
      altText="Interactive 3D scene"
      ariaLabel="Animated background scene"
      className="my-custom-class"
      lazyLoad={true}
      production={true}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
}