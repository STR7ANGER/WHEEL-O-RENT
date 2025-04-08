import GridMotion from "@/blocks/Backgrounds/GridMotion/GridMotion";

const Hero = () => {
  const items = [
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://images.unsplash.com/photo-1689258281627-23b62dc2ee02?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmVycmFyaSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://wallpapers.com/images/hd/audi-r8-pictures-w0gajhbvvzlrhpw0.jpg",
    "https://w0.peakpx.com/wallpaper/813/998/HD-wallpaper-2024-aston-martin-db12-coupe-turbo-v8-car.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://preview.redd.it/took-some-photos-of-an-apollo-ie-v0-4ogc3iak7o8b1.jpg?width=640&crop=smart&auto=webp&s=33694e440a287da87ca3805010976e3039335e32",
    "https://newsroom.cdn.bugatti-media.com/f65d82ed-7e69-4edc-91bd-8901b1baa057/xl",
    "https://wallshub.com/uploads/posts/2024-09/ba6de086dc_black-bmw-rain-4k.webp",
    "https://c4.wallpaperflare.com/wallpaper/355/369/270/car-mclaren-mclaren-senna-hd-wallpaper-preview.jpg",
    "https://w0.peakpx.com/wallpaper/881/662/HD-wallpaper-2020-koenigsegg-jesko-2019-geneva-motor-show-coupe-turbo-v8-car.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://cdn.pixabay.com/photo/2017/05/23/20/07/mustang-2338358_1280.jpg",
    "https://w0.peakpx.com/wallpaper/456/839/HD-wallpaper-rolls-royce-rolls-royce-ghost-car-luxury-car-rolls-royce-white-car.jpg",
    "https://c4.wallpaperflare.com/wallpaper/390/369/293/porsche-911-carrera-s-porsche-car-photography-wallpaper-preview.jpg",
    "https://i.pinimg.com/736x/57/e7/3c/57e73c4ec7d872ab736e1d779c51e653.jpg",
    "https://wallpapers.com/images/hd/hd-project-cars-background-rdll995lle7wulnq.jpg",
    "https://c4.wallpaperflare.com/wallpaper/829/1024/868/car-maserati-sports-car-red-cars-wallpaper-preview.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4MFAGSU4iwoBYoF5P9wwUsLP0ebSAQc7Hvg&s",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://i.pinimg.com/736x/d0/9c/4c/d09c4cfd1b93cc66dc13c8b461fd2145.jpg",
    "https://c4.wallpaperflare.com/wallpaper/567/1022/353/skoda-octavia-rs-wallpaper-preview.jpg",
    "https://images3.alphacoders.com/801/801774.jpg",
    "https://cdn.pixabay.com/photo/2020/02/03/10/07/lamborghini-4815249_1280.jpg",
    "https://c4.wallpaperflare.com/wallpaper/1021/871/632/autumn-bmw-bmw-car-bmw-4-series-hd-wallpaper-preview.jpg",
  ];

  return (
    <div className="relative bg-black h-screen w-full overflow-hidden">
      {/* Grid Motion Background */}
      <div className="absolute inset-0 z-0">
        <GridMotion items={items} />
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

      {/* Content Container */}
      <div className="relative z-20 flex h-full items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg">
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-white">
              Welcome to <span className="text-amber-500">WHEEL O RENT</span>
            </h1>
            <p className="mb-8 text-lg text-gray-300">
              Your premier destination for luxury and exotic car rental
              experiences. Discover our exclusive collection of high-performance
              vehicles and make your journey unforgettable.
            </p>
            <button className="rounded-md bg-amber-500 px-8 py-4 text-lg font-medium text-black transition-all hover:bg-amber-400">
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
