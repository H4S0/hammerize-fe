import HammerizeVideo from '../../../public/real-video.mp4';

const FormVideoCard = () => {
  return (
    <div className="hidden md:block md:w-1/2 h-full rounded-2xl overflow-hidden">
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
