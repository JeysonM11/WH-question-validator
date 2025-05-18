"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AlertCircle,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Trash2,
  BookOpen,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "framer-motion";

export default function WHQuestionsValidator() {
  const [questions, setQuestions] = useState<string[]>(Array(5).fill(""));
  const [results, setResults] = useState<boolean[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (score === 5) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [score]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const validateWHQuestion = (question: string): boolean => {
    // Normalize the question by trimming and ensuring it ends with a question mark
    const normalizedQuestion = question.trim();
    if (!normalizedQuestion.endsWith("?")) return false;

    // Check if the first letter is uppercase
    if (
      normalizedQuestion.charAt(0) !==
      normalizedQuestion.charAt(0).toUpperCase()
    )
      return false;

    // Regular expressions to match WH question patterns (case-insensitive for the rest of the pattern)

    // Pattern 1: WH word + do/does/did + subject + base verb + ?
    const auxiliaryPattern =
      /^(what|where|when|why|who|how|which)\s+(do|does|did)\s+\w+\s+\w+.*\?$/i;

    // Pattern 2: WH word + is/am/are/was/were + subject + ?
    const beVerbPattern =
      /^(what|where|when|why|who|how|which)\s+(is|am|are|was|were)\s+.*\?$/i;

    return (
      auxiliaryPattern.test(normalizedQuestion) ||
      beVerbPattern.test(normalizedQuestion)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const questionResults = questions.map(validateWHQuestion);
    const calculatedScore = questionResults.filter(Boolean).length;

    setResults(questionResults);
    setScore(calculatedScore);
    setSubmitted(true);
  };

  const getMotivationalMessage = (score: number): string => {
    if (score === 5)
      return "¡Excelente! Dominas perfectamente las preguntas WH en inglés.";
    if (score === 4) return "¡Muy bien! Casi perfecto, sigue practicando.";
    if (score === 3) return "¡Buen trabajo! Estás en el camino correcto.";
    if (score === 2) return "Sigue practicando, vas mejorando.";
    if (score === 1) return "No te rindas, la práctica hace al maestro.";
    return "Intenta de nuevo, cada intento es una oportunidad para aprender.";
  };

  const resetForm = () => {
    setResults([]);
    setScore(null);
    setSubmitted(false);
  };

  const clearForm = () => {
    setQuestions(Array(5).fill(""));
    setResults([]);
    setScore(null);
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 flex items-center justify-center p-4">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              initial={{
                top: "0%",
                left: `${Math.random() * 100}%`,
                backgroundColor: [
                  "#FFD700",
                  "#FF6347",
                  "#7FFFD4",
                  "#9370DB",
                  "#20B2AA",
                ][Math.floor(Math.random() * 5)],
              }}
              animate={{
                top: "100%",
                rotate: 360 * Math.random(),
                scale: [1, Math.random() * 2 + 1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-3xl mx-auto"
      >
        <Card className="bg-gray-800 border-gray-700 shadow-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none" />

          <CardHeader className="relative border-b border-gray-700 bg-gray-850 pb-6">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-3xl font-bold text-center text-white flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span>Validador de Preguntas WH</span>
              </CardTitle>
              <CardDescription className="text-gray-300 text-center mt-3">
                <div className="mb-2">
                  Escribe 5 preguntas en inglés del tipo WH siguiendo alguno de
                  estos formatos:
                </div>
                <div className="space-y-1 text-sm bg-gray-900/50 p-3 rounded-lg border border-gray-700 mt-2">
                  <div className="font-mono text-blue-400">
                    WH QUESTION + do/does/did + sujeto + verbo base ?
                  </div>
                  <div className="font-mono text-purple-400">
                    WH QUESTION + is/am/are/was/were + sujeto ?
                  </div>
                </div>
                <div className="text-amber-400 font-medium mt-3 flex items-center justify-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Importante: La primera letra debe ser mayúscula</span>
                </div>
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="relative pt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                {questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.4 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1 relative group">
                        <Input
                          id={`question-${index}`}
                          value={question}
                          onChange={(e) =>
                            handleQuestionChange(index, e.target.value)
                          }
                          placeholder="Ej: Where does she live? / What did you eat?"
                          className={`bg-gray-900 border-gray-600 text-gray-100 h-12 pl-4 pr-10 transition-all duration-300 focus:ring-2 focus:ring-offset-0 ${
                            submitted
                              ? results[index]
                                ? "border-green-500 focus:border-green-500 focus:ring-green-500/50"
                                : "border-red-500 focus:border-red-500 focus:ring-red-500/50"
                              : "focus:border-blue-500 focus:ring-blue-500/50 hover:border-gray-500"
                          }`}
                        />
                        {submitted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 500,
                              damping: 15,
                            }}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2"
                          >
                            {results[index] ? (
                              <CheckCircle2 className="h-6 w-6 text-green-500" />
                            ) : (
                              <AlertCircle className="h-6 w-6 text-red-500" />
                            )}
                          </motion.div>
                        )}
                      </div>
                    </div>
                    {submitted && !results[index] && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-red-400 text-sm mt-2 ml-11 bg-red-900/20 p-2 rounded border border-red-900/30"
                      >
                        Formato incorrecto. Recuerda: WH + do/does/did + sujeto
                        + verbo base ? o WH + is/am/are/was/were + sujeto ? La
                        primera letra debe ser mayúscula.
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="flex justify-center gap-3 mt-8"
              >
                {!submitted ? (
                  <>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                    >
                      Validar Preguntas
                    </Button>
                    <Button
                      type="button"
                      onClick={clearForm}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Borrar Todo
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-2 rounded-md transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/20"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Validar de Nuevo
                    </Button>
                    <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Editar Respuestas
                    </Button>
                    <Button
                      type="button"
                      onClick={clearForm}
                      variant="destructive"
                      className="bg-red-900 hover:bg-red-800 text-white transition-all duration-300"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Borrar Todo
                    </Button>
                  </>
                )}
              </motion.div>
            </form>

            {submitted && score !== null && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mt-8"
              >
                <Alert
                  className={`border ${
                    score >= 3
                      ? "bg-gradient-to-r from-green-900/40 to-green-800/40 border-green-700"
                      : "bg-gradient-to-r from-amber-900/40 to-amber-800/40 border-amber-700"
                  } shadow-lg`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${
                        score >= 3
                          ? "bg-green-500/20 text-green-400"
                          : "bg-amber-500/20 text-amber-400"
                      }`}
                    >
                      <span className="text-xl font-bold">{score}</span>
                    </div>
                    <div>
                      <AlertTitle className="text-lg font-bold mb-1">
                        Tu calificación: {score}/5
                      </AlertTitle>
                      <AlertDescription className="text-base">
                        {getMotivationalMessage(score)}
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              </motion.div>
            )}
          </CardContent>

          <CardFooter className="text-sm text-center text-gray-400 border-t border-gray-700 mt-6 bg-gray-850 relative z-10">
            <div className="w-full py-4">
              <p className="font-semibold tracking-wide text-gray-200 text-lg mb-1 flex items-center justify-center gap-2">
                <Sparkles className="inline-block h-5 w-5 text-blue-400" />
                Proyecto de Autómatas Gramaticales
              </p>
              <p className="mb-3 text-gray-400">
                <span className="font-medium text-blue-300">Tema:</span>{" "}
                Aplicación para Validación de Preguntas en Inglés del Tipo WH
              </p>
              <div className="flex flex-col items-center">
                <h2 className="text-base font-semibold text-purple-300 mb-2 flex items-center gap-2">
                  <BookOpen className="inline-block h-4 w-4 text-purple-400" />
                  Estudiantes
                </h2>
                <ul className="mt-1 text-left space-y-1 text-gray-300 mx-auto max-w-xs">
                  <li className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-blue-500 before:rounded-full before:content-['']">
                    Gutierrez Guerrero Aldair Antonio
                  </li>
                  <li className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-purple-500 before:rounded-full before:content-['']">
                    Medrano Marin Martin Eduardo
                  </li>
                  <li className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-cyan-500 before:rounded-full before:content-['']">
                    Miranda Maza Jeyson Augusto
                  </li>
                  <li className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-amber-500 before:rounded-full before:content-['']">
                    Ospino Gutierrez Miguel Andres
                  </li>
                  <li className="pl-4 relative before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-2 before:h-2 before:bg-green-500 before:rounded-full before:content-['']">
                    Salcedo Padilla Glenn Eduardo
                  </li>
                </ul>
              </div>
              <div className="mt-4 text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Fundación Universitaria
                Tecnologico Comfenalco
              </div>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
