import React, { useEffect, useState } from 'react'

/* libs */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'

/* components */
import Typing from '../typing/typing'

/* apis */
import { getSponsors } from '../../apis/sponsors'

/* types */
import { I_SponsorsList } from '../../types/index'

/* styles */
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './sponsor.module.css'

/* global */
SwiperCore.use([Autoplay])

// ===========================================================

export default function Sponsor() {
  const [sponsors, setSponsors] = useState<I_SponsorsList | null>(null)
  const [swiperAutoplayDelay, setSwiperAutoplayDelay] = useState(10000)

  const fetchSponsors = async () => {
    const sponsorsData = await getSponsors()
    if (sponsorsData) {
      setSponsors(sponsorsData)
    }
  }

  useEffect(() => {
    fetchSponsors()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSwiperAutoplayDelay(3000)
    }, 7000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <React.Fragment>
      <hr />
      <div className={styles.typingFixOnMobile}>
        <Typing
          user="guests"
          host="hiu"
          lists={['echo $Sponsors']}
          root={false}
        />
      </div>
      <div
        style={{
          padding: '1rem',
          minWidth: 400,
        }}
      >
        <Swiper
          autoplay={{
            delay: swiperAutoplayDelay,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          grabCursor={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            708: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1440: {
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
        >
          {sponsors &&
            sponsors.items
              .slice()
              .reverse()
              .map((sponsor) => (
                <SwiperSlide
                  key={sponsor.id}
                  className="d-flex justify-content-center align-content-center align-items-center"
                >
                  <div className={styles.mySwiper}>
                    <img
                      src={
                        process.env.API_URL +
                        'files/' +
                        sponsor.collectionId +
                        '/' +
                        sponsor.id +
                        '/' +
                        sponsor.logo
                      }
                      alt={sponsor.name + ' logo'}
                      width={200}
                    />
                    <h6>{sponsor.name}</h6>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </React.Fragment>
  )
}
