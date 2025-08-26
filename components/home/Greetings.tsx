'use client'

interface GreetingsProps {
  firstName: string
  className?: string
}

export function Greetings({ firstName, className = '' }: GreetingsProps) {
  return (
    <div className={`text-center ${className}`}>
      {/* First Line - Personalized Welcome */}
      <h2 className="text-2xl font-bold text-primary mb-2">
        Magandang Araw Ka-Sillag {firstName}!
      </h2>
      
      {/* Second Line - Service Question */}
      <p className="text-lg text-gray-700">
        Ano po ang maipaglilinkod ko sa inyo ngayong araw?
      </p>
    </div>
  )
}
