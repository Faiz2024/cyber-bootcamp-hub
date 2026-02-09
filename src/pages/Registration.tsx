import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Shield, Send, ArrowLeft, Upload, X, FileImage } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const registrationSchema = z.object({
  name: z.string().trim().min(2, "Nama minimal 2 karakter").max(100, "Nama terlalu panjang"),
  email: z.string().trim().email("Email tidak valid").max(255, "Email terlalu panjang"),
  phone: z.string().trim().min(10, "Nomor HP minimal 10 digit").max(15, "Nomor HP terlalu panjang"),
  education: z.string().min(1, "Pilih pendidikan terakhir"),
  experience: z.string().min(1, "Pilih pengalaman IT"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [proofError, setProofError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setProofError(null);

    if (!file) return;

    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setProofError("Format file harus JPG, PNG, WEBP, atau PDF");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setProofError("Ukuran file maksimal 5MB");
      return;
    }

    setPaymentProof(file);
  };

  const removeFile = () => {
    setPaymentProof(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: RegistrationForm) => {
    if (!paymentProof) {
      setProofError("Upload bukti pembayaran wajib diisi");
      return;
    }

    try {
      const base64Proof = await fileToBase64(paymentProof);

      const payload = {
        ...data,
        paymentProofName: paymentProof.name,
        paymentProofType: paymentProof.type,
        paymentProofBase64: base64Proof,
      };

      await fetch(
        "https://script.google.com/macros/s/AKfycbzDB5VJaBuwruR0PgFwCx9o3hGlsAadSEe9u6MMfZ8UC0f_iC1tkc22d7Xej0th69TsmQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      setIsSubmitted(true);
      toast({
        title: "Pendaftaran Berhasil! 🎉",
        description: "Tim kami akan menghubungimu dalam 1x24 jam.",
      });
    } catch (error) {
      toast({
        title: "Gagal Mengirim",
        description: "Terjadi kesalahan. Silakan coba lagi.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
          <div className="absolute inset-0 cyber-grid opacity-20" />
          <div className="absolute inset-0 gradient-radial-primary" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 max-w-md text-center"
          >
            <div className="mb-6 inline-flex rounded-full bg-primary/20 p-6">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <h1 className="mb-4 font-mono text-3xl font-bold">
              Pendaftaran <span className="text-primary glow-text-primary">Berhasil!</span>
            </h1>
            <p className="mb-8 text-muted-foreground">
              Terima kasih telah mendaftar CyberShield Bootcamp. Tim kami akan menghubungimu dalam 1x24 jam melalui email dan WhatsApp.
            </p>
            <Link to="/">
              <Button variant="hero-outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali ke Beranda
              </Button>
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="absolute inset-0 cyber-grid opacity-10" />
      <div className="relative container mx-auto px-4">
        {/* Back link */}
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Beranda
        </Link>

        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <span className="mb-3 inline-block font-mono text-sm uppercase tracking-widest text-primary">
              Batch #12 — Maret 2026
            </span>
            <h1 className="mb-3 text-3xl font-bold md:text-4xl">
              Form <span className="text-primary glow-text-primary">Pendaftaran</span>
            </h1>
            <p className="text-muted-foreground">
              Isi formulir di bawah ini untuk mendaftar CyberShield Bootcamp. Kami akan menghubungimu untuk konfirmasi.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 rounded-lg border border-border bg-card p-6 md:p-8"
          >
            {/* Nama */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-mono text-sm">
                Nama Lengkap <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap"
                className="bg-muted/50 border-border focus:border-primary"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-mono text-sm">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@contoh.com"
                className="bg-muted/50 border-border focus:border-primary"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-mono text-sm">
                Nomor HP / WhatsApp <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                placeholder="08xxxxxxxxxx"
                className="bg-muted/50 border-border focus:border-primary"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-xs text-destructive">{errors.phone.message}</p>
              )}
            </div>

            {/* Education & Experience */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-mono text-sm">
                  Pendidikan Terakhir <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("education", value)}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Pilih pendidikan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sma">SMA / SMK</SelectItem>
                    <SelectItem value="d3">D3</SelectItem>
                    <SelectItem value="s1">S1</SelectItem>
                    <SelectItem value="s2">S2</SelectItem>
                    <SelectItem value="other">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                {errors.education && (
                  <p className="text-xs text-destructive">{errors.education.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="font-mono text-sm">
                  Pengalaman IT <span className="text-destructive">*</span>
                </Label>
                <Select onValueChange={(value) => setValue("experience", value)}>
                  <SelectTrigger className="bg-muted/50 border-border">
                    <SelectValue placeholder="Pilih pengalaman" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Belum ada</SelectItem>
                    <SelectItem value="less-1">Kurang dari 1 tahun</SelectItem>
                    <SelectItem value="1-3">1 - 3 tahun</SelectItem>
                    <SelectItem value="3-5">3 - 5 tahun</SelectItem>
                    <SelectItem value="more-5">Lebih dari 5 tahun</SelectItem>
                  </SelectContent>
                </Select>
                {errors.experience && (
                  <p className="text-xs text-destructive">{errors.experience.message}</p>
                )}
              </div>
            </div>

            {/* Payment Info */}
            <div className="space-y-3">
              <Label className="font-mono text-sm">
                Informasi Pembayaran
              </Label>
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Bank</span>
                  <span className="font-mono font-bold text-foreground">BCA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">No. Rekening</span>
                  <span className="font-mono font-bold text-foreground">1234567890</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Atas Nama</span>
                  <span className="font-mono font-bold text-foreground">CyberShield Academy</span>
                </div>
                <div className="my-2 border-t border-border" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Transfer</span>
                  <span className="font-mono text-lg font-extrabold text-primary">Rp 30.000</span>
                </div>
              </div>
            </div>

            {/* Payment Proof Upload */}
            <div className="space-y-2">
              <Label className="font-mono text-sm">
                Upload Bukti Pembayaran <span className="text-destructive">*</span>
              </Label>
              <input
                ref={fileInputRef}
                type="file"
                accept=".jpg,.jpeg,.png,.webp,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {!paymentProof ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex w-full flex-col items-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 transition-colors hover:border-primary/50 hover:bg-muted/50"
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Klik untuk upload file</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      JPG, PNG, WEBP, atau PDF (maks. 5MB)
                    </p>
                  </div>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4">
                  <FileImage className="h-8 w-8 shrink-0 text-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {paymentProof.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(paymentProof.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="rounded-full p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}

              {proofError && (
                <p className="text-xs text-destructive">{proofError}</p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                  Mengirim...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Kirim Pendaftaran
                </span>
              )}
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Registration;
