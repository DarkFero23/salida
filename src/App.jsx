import { useState, useEffect } from "react";
import JSConfetti from 'js-confetti';
import { motion } from "framer-motion";

function App() {
    const jsConfetti = new JSConfetti();
    const [randomValor, setRandomValor] = useState({});
    const [valueSi, setValueSi] = useState(false);
    const [userIP, setUserIP] = useState("");
    const [noClickCount, setNoClickCount] = useState(0); 
    const [siButtonMessage, setSiButtonMessage] = useState("Sí 💖"); 

    let noMessages = [
        { id: 1, description: "¿Segura que no? Piensa bien 🥺" },
        { id: 2, description: "Pinesa todas las picaras que podriamos comer" },
        { id: 3, description: "Nos contaremos chismes" },
        { id: 4, description: "Mira que no insisto mucho... o sí? 🙊" },
        { id: 5, description: "Voy a seguir intentando 🫣" },
        { id: 6, description: "No te vas a arrepentir 🙊" },
    ];

    const [noMessageIndex, setNoMessageIndex] = useState(0);

    useEffect(() => {
        fetch("https://api64.ipify.org?format=json")
            .then(response => response.json())
            .then(data => setUserIP(data.ip))
            .catch(error => console.error("Error obteniendo la IP:", error));
    }, []);

    const handleClick = async (button) => {
        await fetch("http://localhost:5000/save-click", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ip: userIP, button })
        });
    };

    const randomResponse = async () => {
        setRandomValor(noMessages[noMessageIndex]);
        await handleClick("No");
        setNoClickCount(prev => prev + 1);
        setNoMessageIndex(prevIndex => (prevIndex + 1) % noMessages.length);
    };

    return (
        <main className="w-screen h-screen bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center font-['Poppins']">
            <div className="p-12 bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl text-center space-y-12 max-w-2xl w-full">
                {!valueSi ? (
                    <>
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg leading-snug">
                            ¿Quieres ser mi San Valentín? ❤️
                        </h1>
                        <img 
                            src={randomValor.img || "/gato_lengua.jpeg"} 
                            alt="San Valentin" 
                            className="mx-auto rounded-lg shadow-lg w-80 h-80 object-cover" 
                        />
                        <div className="flex justify-center gap-8">
                            <motion.button
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={async () => {
                                    setValueSi(true);
                                    jsConfetti.addConfetti({
                                        emojis: ['😍', '🥰', '❤️', '😘'],
                                        emojiSize: 80,
                                        confettiNumber: 120,
                                    });
                                    await handleClick("Sí");
                                }}
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-5 px-10 rounded-full text-3xl shadow-lg transition-all duration-300"
                            >
                                {siButtonMessage}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={randomResponse}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-5 px-10 rounded-full text-3xl shadow-lg transition-all duration-300"
                            >
                                {randomValor.description || "No 💔"}
                            </motion.button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-10">
                        <h1 className="text-6xl font-extrabold text-white drop-shadow-lg leading-snug">¡Sabía que dirías que sí! ❤️</h1>
                        <img 
                            src="/gato_si.png" 
                            alt="Celebración" 
                            className="mx-auto rounded-lg shadow-lg w-80 h-80 object-cover" 
                        />
                    </div>
                )}
            </div>
        </main>
    );
}

export default App;
