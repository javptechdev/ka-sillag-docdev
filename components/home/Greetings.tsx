'use client'

interface GreetingsProps {
  name: string
  className?: string
}

export function Greetings({ name, className = '' }: GreetingsProps) {
  // Extract first name from full name, handling titles like Dr., Prof., etc.
  const nameParts = name.split(' ')
  let firstName = nameParts[0]
  
  // If first part is a title, get the second part
  const titles = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.', 'Sir', 'Madam']
  if (titles.includes(firstName)) {
    firstName = nameParts[1] || firstName
  }
  

  
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
