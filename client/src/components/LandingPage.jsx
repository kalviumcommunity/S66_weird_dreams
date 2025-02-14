const LandingPage = () => {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center opacity-30">
          <img
            src="https://files.oaiusercontent.com/file-L5RsnveGDyzzBWJNeN9Z6o?se=2025-02-10T08%3A29%3A11Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D81c77081-42fd-44dd-b19d-fe71f6a341e5.webp&sig=/LkWjV5vMKexiobKfD2x1J4uDXkM8/OwYYn3/ZdkTck%3D"
            alt="Dreamy Background"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>

        <section className="relative flex flex-col items-center justify-center h-screen text-center px-6">
          <h1 className="text-6xl md:text-8xl font-extrabold text-purple-300 drop-shadow-lg">
            Weird Dreams ✨
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl text-purple-200 mt-4 opacity-90">
            Dive into the surreal world of dreams. Log your strangest, most
            ethereal thoughts and explore your subconscious mind.
          </p>
        </section>

        {/* Updated Feature Section with New Colors */}
        <section className="py-16 bg-gradient-to-b from-[#773092] via-[#5A59C1] to-[#5D3B88] relative">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-center mb-12 text-[#C7B3F7] drop-shadow-lg">
              Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <FeatureCard
                image="https://files.oaiusercontent.com/file-7U9AF7yTvLKC1WBLMymot2?se=2025-02-10T08%3A33%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D3658fbb5-9dbd-401c-8e6e-30100cd87cfd.webp&sig=7M%2BEDHYNj9hIHu2qHSYo5BXMrIUfiasauS9ai/Q97U4%3D"
                title="Secure Login 🔐"
                description="Register and log in securely to access your private dream journal."
              />
              <FeatureCard
                image="https://files.oaiusercontent.com/file-Ti2Ft4TN52hnyCySFNL4oZ?se=2025-02-10T08%3A31%3A05Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De86655cc-274a-4816-bbdf-cdfdc42ea5f2.webp&sig=3/sxw8u/HPGYlXMCoa8KUkB07a%2BuiYZIf%2BAp4EWzlE0%3D"
                title="Dream Entries 📝"
                description="Add, update, and delete dream entries with ease."
              />
              <FeatureCard
                image="https://files.oaiusercontent.com/file-DUPtwZV16oDT5XEg7SCGQf?se=2025-02-10T08%3A33%3A52Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D1978b4a5-c688-4865-94ea-04e943f18120.webp&sig=F0F5Yqz%2Bidjilvxv9uBDeNSAqi7Ieic2PALamSwjY3o%3D"
                title="Tag Your Dreams 🌙"
                description="Organize your dreams using AI-powered categorization."
              />
              <FeatureCard
                image="https://files.oaiusercontent.com/file-PnSK9ay1euYQhhPX779ckN?se=2025-02-10T08%3A35%3A37Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D9b4bd359-57e8-4cc3-b03a-c9732bb0bd40.webp&sig=KjWxIT2MqIJMXySusV6q/lsq/aBV%2BmFFFjINdKKZPK0%3D"
                title="Futuristic UI 🚀"
                description="A sleek, immersive interface with cosmic aesthetics."
              />
              <FeatureCard
                image="https://files.oaiusercontent.com/file-Gn3okqG7EBs7SciekN8d1M?se=2025-02-10T08%3A41%3A32Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5061c23f-127e-434d-ace5-6da9cea69a6e.webp&sig=HO90XNKX4wutiY2Dnj%2BF4h5V00nZirUn%2Bs3NG1Xhx%2BM%3D"
                title="AI Analysis 🤖"
                description="Analyze dream patterns and uncover hidden meanings."
              />
              <FeatureCard
                image="https://files.oaiusercontent.com/file-QFCd65MBZSiKc4L1objQuY?se=2025-02-10T08%3A43%3A14Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Da7daf691-e8bd-4ce6-a212-4b9a814723f0.webp&sig=1s8yZBapdNiz8nnUm9RimgHU7SGinFM4RVr/J%2BnjtY8%3D"
                title="Share and Post 🌍"
                description="Available anywhere, anytime with a global cloud server."
              />
            </div>
          </div>
        </section>
      </div>
    );
    };

    const FeatureCard = ({ image, title, description }) => (
    <div className="bg-gradient-to-br from-[#5A59C1] to-[#5D3B88] p-6 rounded-xl shadow-xl hover:scale-105 transition duration-300 shadow-[#C7B3F7]/50 border border-[#C7B3F7]/50 relative">
        <div className="absolute -top-2 -right-2 bg-[#F7B3F7] w-8 h-8 rounded-full"></div>
        <img
        src={image}
        alt={title}
        className="w-full h-60 object-cover rounded-md mb-4 shadow-lg border border-[#C7B3F7]/50"
        />
        <h3 className="text-2xl font-semibold mb-2 text-[#E3D1FF] drop-shadow-md">
        {title}
        </h3>
        <p className="text-[#D8C2FF] opacity-90">{description}</p>
    </div>
);

export default LandingPage;
