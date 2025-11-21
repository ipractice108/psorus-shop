'use client'

const healthTips = [
  {
    icon: '🧘‍♀️',
    title: 'Движение',
    description: 'Лёгкая зарядка и глубокое дыхание',
  },
  {
    icon: '🥗',
    title: 'Питание',
    description: 'Сбалансированный рацион',
  },
  {
    icon: '😌',
    title: 'Отдых',
    description: 'Полноценный сон и релаксация',
  },
]

export default function HealthSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Красота кожи начинается изнутри
          </h2>

          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            Важно не только ухаживать за кожей снаружи, но и поддерживать гармонию тела и ума.
            Начинайте утро с лёгкой зарядки, дышите глубоко, питайтесь умеренно и давайте телу отдых.
            <span className="font-semibold text-green-700"> «Нежная кожа»</span> — часть этого естественного
            пути к здоровью.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {healthTips.map((tip, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg card-hover"
              >
                <div className="text-5xl mb-3">{tip.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {tip.title}
                </h3>
                <p className="text-gray-600">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-green-100 rounded-2xl">
            <p className="text-lg text-green-800 italic">
              &ldquo;Здоровье — это целый путь, и каждый шаг важен&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
