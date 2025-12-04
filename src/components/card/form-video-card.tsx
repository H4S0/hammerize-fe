import HammerizeVideo from '../../../public/real-video.mp4';

const FormVideoCard = () => {
  return (
    <div className="md:w-1/2 h-[93vh] rounded-2xl overflow-hidden shadow-lg">
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
