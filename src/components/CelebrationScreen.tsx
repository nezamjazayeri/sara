import { useState } from 'react'

const ALL_PHOTOS = [
  '55F961BD-9442-4DB0-9322-00FAB06F3D12.JPG',
  '884A2CA6-903B-4265-93BC-1E280C1D6815.jpg',
  'AB348AC2-3FF6-4863-A25F-D8D31C2ECE94.JPG',
  'CIMG3890.JPG', 'CIMG4031.JPG', 'CIMG4049.JPG', 'CIMG4058.JPG',
  'DSC00447.JPG', 'DSC00463.JPG', 'DSC00473.JPG',
  'DSC01419.JPG', 'DSC01445.JPG', 'DSC01465.JPG', 'DSC01480.JPG',
  'FullSizeRender.JPG',
  'IMG_0045.JPG', 'IMG_0052.JPG', 'IMG_0056.JPG', 'IMG_0063.JPG',
  'IMG_0167.jpeg', 'IMG_0214.JPG', 'IMG_0216.JPG', 'IMG_0233.jpeg',
  'IMG_0244.jpeg', 'IMG_0269.jpeg', 'IMG_0337.JPG', 'IMG_0337.jpeg',
  'IMG_0397.JPG', 'IMG_0407.JPG', 'IMG_0408.JPG', 'IMG_0452.JPG',
  'IMG_0475.jpeg', 'IMG_0484.jpeg', 'IMG_0502.jpeg', 'IMG_0587.jpeg',
  'IMG_0603.jpeg', 'IMG_0624.jpeg', 'IMG_0629.jpeg', 'IMG_0733.jpeg',
  'IMG_0741.jpeg', 'IMG_0755.jpeg', 'IMG_0812.jpeg', 'IMG_0814.JPG',
  'IMG_0820.jpeg', 'IMG_0824.jpeg', 'IMG_0840.jpeg', 'IMG_0853.jpeg',
  'IMG_0910.jpeg', 'IMG_0914.jpeg', 'IMG_0920.jpeg', 'IMG_0929.JPG',
  'IMG_1179.JPG', 'IMG_1217.JPG', 'IMG_1476.JPG', 'IMG_1481.JPG',
  'IMG_1493.JPG', 'IMG_1570.JPG', 'IMG_1584.JPG', 'IMG_1586.JPG',
  'IMG_1590.JPG', 'IMG_1591.jpeg', 'IMG_1642.JPG', 'IMG_1772.jpeg',
  'IMG_1942.jpeg', 'IMG_1947.jpeg', 'IMG_2218.JPG', 'IMG_2220.JPG',
  'IMG_2221.jpeg', 'IMG_2222.JPG', 'IMG_2250.jpeg', 'IMG_2511.jpeg',
  'IMG_2523.jpeg', 'IMG_2583.jpeg', 'IMG_2600.jpeg', 'IMG_2613.jpeg',
  'IMG_2624.jpeg', 'IMG_2660.jpeg', 'IMG_2989.JPG', 'IMG_3302.JPG',
  'IMG_3361.jpeg', 'IMG_3414.JPG', 'IMG_3420.JPG', 'IMG_3545.JPG',
  'IMG_3546.JPG', 'IMG_3618.jpeg', 'IMG_3956.JPG', 'IMG_3960.jpeg',
  'IMG_4040.jpeg', 'IMG_4067.jpeg', 'IMG_4068.jpeg', 'IMG_4123.jpeg',
  'IMG_4189.JPG', 'IMG_4207.JPG', 'IMG_4255.jpeg', 'IMG_4281.jpeg',
  'IMG_4330.JPG', 'IMG_4332.JPG', 'IMG_4437.JPG', 'IMG_4442.JPG',
  'IMG_4451.JPG', 'IMG_4558.JPG', 'IMG_4579.JPG', 'IMG_4582.JPG',
  'IMG_4588.JPG', 'IMG_4602.JPG', 'IMG_4604.JPG', 'IMG_4881.JPG',
  'IMG_6833.JPG', 'IMG_6875.JPG', 'IMG_6878.JPG', 'IMG_6907.JPG',
  'IMG_6908.JPG', 'IMG_7016.JPG', 'IMG_7022.JPG', 'IMG_7037.jpeg',
  'IMG_7050.JPG', 'IMG_7054.JPG', 'IMG_7056.JPG', 'IMG_7061.JPG',
  'IMG_7072.JPG', 'IMG_7131.JPG', 'IMG_7175.JPG', 'IMG_7181.JPG',
  'IMG_7214.JPG', 'IMG_7238.JPG', 'IMG_7302.JPG', 'IMG_7307.JPG',
  'IMG_7343.JPG', 'IMG_7377.JPG', 'IMG_7403.JPG', 'IMG_7437.JPG',
  'IMG_7440.JPG', 'IMG_7500.jpeg', 'IMG_7501.JPG', 'IMG_7518.jpeg',
  'IMG_7554.jpeg', 'IMG_7579.JPG', 'IMG_7598.jpeg', 'IMG_7620.jpeg',
  'IMG_7651.JPG', 'IMG_7668.jpeg', 'IMG_7714.JPG', 'IMG_7835.JPG',
  'IMG_7900.JPG', 'IMG_7926.JPG', 'IMG_7969.jpeg', 'IMG_8006.JPG',
  'IMG_8014.JPG', 'IMG_8037.jpeg', 'IMG_8694.JPG', 'IMG_8735.jpeg',
  'IMG_8868.JPG', 'IMG_8948.jpeg', 'IMG_9543.jpeg', 'IMG_9576.jpeg',
  'IMG_9873.JPG', 'IMG_9972.JPG',
]

const DISPLAY_COUNT = 25
const BASE_PATH = import.meta.env.BASE_URL + 'photos/'

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

interface PhotoLayout {
  file: string
  x: number
  y: number
  rotation: number
  delay: number
}

const FALLING_EMOJIS = ['🐥', '💩']

function generatePhotos(): PhotoLayout[] {
  const picked = shuffle(ALL_PHOTOS).slice(0, DISPLAY_COUNT)
  const cols = 5
  const rows = Math.ceil(DISPLAY_COUNT / cols)
  return picked.map((file, i) => {
    const col = i % cols
    const row = Math.floor(i / cols)
    return {
      file,
      x: (col / cols) * 100 + (Math.random() * 10 - 5),
      y: (row / rows) * 100 + (Math.random() * 8 - 4),
      rotation: Math.random() * 24 - 12,
      delay: i * 0.1,
    }
  })
}

export default function CelebrationScreen() {
  const [photos, setPhotos] = useState<PhotoLayout[]>(() => generatePhotos())
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    setPhotos(generatePhotos())
    setRefreshKey((k) => k + 1)
  }

  const [hearts] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 32 + Math.random() * 40,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 4,
      emoji: FALLING_EMOJIS[Math.floor(Math.random() * FALLING_EMOJIS.length)],
    }))
  )

  return (
    <div className="screen celebration-screen">
      <div className="photo-collage">
        {photos.map((p, i) => (
          <div
            key={`${refreshKey}-${i}`}
            className="polaroid"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              '--rotation': `${p.rotation}deg`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          >
            <img src={BASE_PATH + p.file} alt="" loading="eager" />
          </div>
        ))}
      </div>

      <div className="hearts-container">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="falling-heart"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
            }}
          >
            {heart.emoji}
          </span>
        ))}
      </div>

      <div className="celebration-content">
        <h1 className="celebration-title">I love you Poop</h1>
        <p className="celebration-message">Let's have extra dirty cocktails :)</p>
        <button
          className="refresh-btn"
          onClick={handleRefresh}
        >
          More photos
        </button>
      </div>
    </div>
  )
}
