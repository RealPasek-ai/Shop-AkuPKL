import SideNavbarUser from './SideNavbarUser';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../common/ProductCard';

const Wishlist = ({ user }) => {
  const { items, totalWishlist } = useWishlist();

  return (
    <div className="flex min-h-screen bg-cloud p-8 font-body antialiased text-ink">
      <div className="w-64 shrink-0">
        <SideNavbarUser user={user} />
      </div>

      <main className="grow ml-8">
        <div className="p-10 bg-white w-full max-w-4xl min-h-500px border border-ash/40">
          <div className="flex items-baseline justify-between">
            <h1 className="text-xl font-bold tracking-tight text-ink">Wishlist</h1>
            {totalWishlist > 0 && (
              <span className="eyebrow text-smoke">{totalWishlist} item</span>
            )}
          </div>
          <hr className="border-ash/40 my-6" />

          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <img
                src="https://res.cloudinary.com/dwearrvmp/image/upload/v1783763661/bag_mbrsot.png"
                alt="Wishlist Kosong"
                className="w-32 h-32 object-contain opacity-80"
                style={{ filter: 'grayscale(100%) brightness(40%)' }}
              />
              <p className="text-smoke font-medium text-lg">Wishlist Anda Kosong</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Wishlist;
