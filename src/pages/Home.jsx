import Hero from '../components/home/Hero'
import ProductTiles from '../components/home/ProductTiles'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Newsletter from '../components/home/Newsletter'

/**
 * pages/Home.jsx
 * Halaman utama storefront. Merakit section-section yang sudah ada
 * (Hero, kategori, produk unggulan, newsletter) menjadi satu beranda.
 * Navbar, MarqueeBar, dan Footer disediakan oleh <Layout /> lewat <Outlet />.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <ProductTiles />
      <CategoryGrid />
      <FeaturedProducts />
      <Newsletter />
    </>
  )
}
