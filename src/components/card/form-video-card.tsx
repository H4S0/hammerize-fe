import HammerizeVideo from '../../../public/real-video.mp4';

const FormVideoCard = () => {
  return (
    <div className="hidden md:block w-1/2 h-[calc(100vh-32px)] rounded-2xl overflow-hidden m-4">
      <video
        src={HammerizeVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover scale-120 transition-transform duration-700 ease-out"
      />
    </div>
  );
};

export default FormVideoCard;
