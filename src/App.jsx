import { useState } from "react";
import JSConfetti from 'js-confetti';
import { motion } from "framer-motion";

function App() {
    const jsConfetti = new JSConfetti();
    const [randomValor, setRandomValor] = useState({});
    const [valueSi, setValueSi] = useState(false);
    const [noClickCount, setNoClickCount] = useState(0);
    const [siButtonMessage, setSiButtonMessage] = useState("Sí 😸");

    let noMessages = [
        { id: 1, description: "¿Segura que no? Ya veo que te gusta hacerme sufrir... 🥺" },
        { id: 2, description: "Segura??? , tego memes de gatitos. 😸" },
        { id: 3, description: "Nos contaremos chismes" },
        { id: 4, description: "Mira que no insisto mucho... o sí? " },
        { id: 5, description: "Uhmm talvez con un ceviche cambies de opinion jeje ˗ˏˋ ★ ˎˊ˗ " },
        { id: 6, description: "Vamos a pasear por la vida 🐱ྀི" },
    ];

    const [noMessageIndex, setNoMessageIndex] = useState(0);

    const randomResponse = () => {
        setRandomValor(noMessages[noMessageIndex]);
        setNoClickCount(prev => prev + 1);
        setNoMessageIndex(prevIndex => (prevIndex + 1) % noMessages.length);
    };

    return (
        <main className="w-screen h-screen bg-gradient-to-r from-rose-500 to-pink-600 flex items-center justify-center font-['Poppins']">
            <div className="p-12 bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl text-center space-y-12 max-w-2xl w-full">
                {!valueSi ? (
                    <>
                        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg leading-snug">
                            ¿Quieres ser mi San Valentín? ¿Y salir mañana?
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
                                onClick={() => {
                                    setValueSi(true);
                                    jsConfetti.addConfetti({
                                        emojis: ['😎', '😛', '😛', '😸'],
                                        emojiSize: 80,
                                        confettiNumber: 120,
                                    });
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
                                {randomValor.description || "No 😿"}
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
