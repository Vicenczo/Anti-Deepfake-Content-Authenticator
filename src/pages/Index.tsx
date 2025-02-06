import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { AnalysisResult } from "@/components/AnalysisResult";
import { Card } from "@/components/ui/card";

const generateHash = async (file: File): Promise<string> => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
};

const simulateAIAnalysis = (): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random()); // Simulated AI score between 0 and 1
    }, 2000);
  });
};

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileHash, setFileHash] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiScore, setAiScore] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    setIsAnalyzing(true);
    setAiScore(null);

    try {
      const hash = await generateHash(file);
      setFileHash(hash);
      
      const score = await simulateAIAnalysis();
      setAiScore(score);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Anti-Deepfake Content Authenticator
            </h1>
            <p className="text-gray-600">
              Verify the authenticity of your digital content and detect potential deepfakes
            </p>
          </div>

          <Card className="p-6">
            <FileUpload onFileSelect={handleFileSelect} />
          </Card>

          <AnalysisResult
            file={selectedFile}
            hash={fileHash}
            isAnalyzing={isAnalyzing}
            aiScore={aiScore}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;