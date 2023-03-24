import React from 'react'

/* libs */
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'

/* styles */
import 'swiper/swiper-bundle.css'
import 'swiper/css'
import 'swiper/css/pagination'
import styles from './sponsor.module.css'

/* types */
import { I_SponsorList } from '../../types'

/* global */
SwiperCore.use([Autoplay])

// ===========================================================

export default function Sponsor({ data }: I_SponsorList) {
  return (
    <React.Fragment>
      <div
        style={{
          padding: '1rem',
          minWidth: 400,
        }}
      >
        <Swiper
          autoplay={{
            delay: 3000,
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
          {data.map((d) => (
            <SwiperSlide
              key={d.id}
              className="d-flex justify-content-center align-content-center align-items-center"
            >
              <div className={styles.mySwiper}>
                <img src={d.url} alt={d.title + ' logo'} width={200} />
                <h6>{d.title}</h6>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </React.Fragment>
  )
}
