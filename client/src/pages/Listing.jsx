import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { FaShare } from "react-icons/fa";
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {

    SwiperCore.use([Navigation]);

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState(null);
    const [error, setError] = useState(false);
    const [copy, setCopy] = useState(false);

    const params = useParams();

    console.log(listing);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
    
                if(data.success === false){
                    console.log(data.message);
                    setError(true);
                    setLoading(false);
                }

                setListing(data);
                setError(false);
                setLoading(false);

            } catch (error) {
                setError(true);
                setLoading(false);
            }
        }
        fetchListing();
    }, [params.listingId])

  return (
    <main>
      {loading && <p className="text-center text-2xl my-7">Loading...</p>}
      {error && (
        <p className="text-red-700 text-center text-2xl my-7">Error occurred</p>
      )}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => {
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            })}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 2000);
              }}
            />
          </div>
          { copy && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>Link Copied!</p>
          )}
        </div>
      )}
    </main>
  );
}

export default Listing