import SideNavbarUser from './SideNavbarUser';

const Wishlist = ({ user }) => {
  return (
    <div className="flex min-h-screen bg-[#FBF8F3] p-8 font-sans antialiased text-gray-900">
      
      <div className="w-64 shrink-0">
        <SideNavbarUser user={user} />
      </div>

    
      <main className="grow ml-8">
        <div className="p-10 rounded-3xl shadow-sm bg-[#F7F3EB] w-full max-w-4xl min-h-500px border border-gray-200/40">
          
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Wishlist
          </h1>
          <hr className="border-gray-300/40 my-6" />

          
          <div className="flex flex-col items-center justify-center py-16 space-y-4">
            <img 
              src="https://res.cloudinary.com/dwearrvmp/image/upload/v1783763661/bag_mbrsot.png" 
              alt="Wishlist Kosong" 
              className="w-32 h-32 object-contain opacity-80" 
              style={{ filter: "grayscale(100%) brightness(40%)" }}
            />
            <p className="text-gray-500 font-medium text-lg">
              Wishlist Anda Kosong
            </p>
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default Wishlist;