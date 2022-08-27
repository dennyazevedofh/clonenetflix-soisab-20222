import React, { useState, useEffect } from 'react'
import './App.css'
import Tmdb from './Tmdb'

import FeaturedMovie  from './components/FeaturedMovie'
import Header from './components/Header'

export default () => {
  const [blackHeader, setBlackHeader] = useState(false)
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)

  useEffect(() => {
    const loadAll = async () => {
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      let originals = list.filter(i => i.slug === 'originals')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let choseInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      console.log(choseInfo)
      setFeaturedData(choseInfo)
    }
    loadAll()
  }, [])

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      } else {
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <div className="Lists">

      </div>
      <footer>
        Feito por Denny Azevedo <br />
        Direitos de imagem para Netflix <br />
        Dados pegos do site Themoviedb.org
      </footer>
    </div>
  )
}