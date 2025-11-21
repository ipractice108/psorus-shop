'use client'

const features = [
  {
    icon: '🌿',
    title: 'Натуральный состав',
    description: 'Только природные компоненты из традиционной китайской медицины',
  },
  {
    icon: '💧',
    title: 'Для чувствительной кожи',
    description: 'Мягкая формула, подходящая даже для самой нежной кожи',
  },
  {
    icon: '🇨🇳',
    title: 'Проверено веками',
    description: 'Основано на многовековых традициях китайской медицины',
  },
]

export default function Features() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают Нежная кожа
            </h2>
            <p className="text-xl text-gray-600">
              Забота о вашей коже с любовью к природе
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl card-hover border border-green-100"
              >
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
