import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const FileUpload = ({ onFileSelect }: { onFileSelect: (file: File) => void }) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      validateAndProcessFile(files[0]);
    }
  };

  const validateAndProcessFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4'];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image (JPEG, PNG, GIF) or video (MP4)",
        variant: "destructive",
      });
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return;
    }
    onFileSelect(file);
  };

  return (
    <div
      className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
        isDragging ? "border-secondary bg-secondary/10" : "border-gray-300"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="hidden"
        id="file-upload"
        onChange={handleFileSelect}
        accept="image/jpeg,image/png,image/gif,video/mp4"
      />
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center gap-2"
      >
        <Upload className="w-12 h-12 text-gray-400" />
        <div className="text-lg font-medium">
          Drag and drop or click to upload
        </div>
        <p className="text-sm text-gray-500">
          Support for JPEG, PNG, GIF, MP4 (max 10MB)
        </p>
        <Button variant="secondary" className="mt-4">
          Select File
        </Button>
      </label>
    </div>
  );
};