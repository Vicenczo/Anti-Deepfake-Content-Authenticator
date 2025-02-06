import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AnalysisResultProps {
  file: File | null;
  hash: string | null;
  isAnalyzing: boolean;
  aiScore: number | null;
}

export const AnalysisResult = ({ file, hash, isAnalyzing, aiScore }: AnalysisResultProps) => {
  if (!file) return null;

  const getAIVerdict = () => {
    if (aiScore === null) return null;
    if (aiScore < 0.3) return { status: "authentic", icon: CheckCircle, color: "text-green-500" };
    if (aiScore < 0.7) return { status: "suspicious", icon: AlertCircle, color: "text-yellow-500" };
    return { status: "likely fake", icon: XCircle, color: "text-red-500" };
  };

  const verdict = getAIVerdict();

  return (
    <Card className="p-6 mt-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Analysis Results</h3>
          {isAnalyzing && (
            <div className="text-sm text-secondary animate-pulse">
              Analyzing...
            </div>
          )}
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">File Name</span>
            <span className="font-medium">{file.name}</span>
          </div>

          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-gray-600">File Size</span>
            <span className="font-medium">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </span>
          </div>

          {hash && (
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-gray-600">Content Hash</span>
              <span className="font-mono text-sm">{hash.slice(0, 10)}...</span>
            </div>
          )}

          {verdict && (
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-600">AI Verdict</span>
              <div className="flex items-center gap-2">
                <verdict.icon className={`w-5 h-5 ${verdict.color}`} />
                <span className={`font-medium capitalize ${verdict.color}`}>
                  {verdict.status}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};