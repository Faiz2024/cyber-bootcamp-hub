import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Shield, Send, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  package: z.string().min(1, "Pilih paket bootcamp"),
  motivation: z.string().trim().min(10, "Ceritakan motivasimu minimal 10 karakter").max(1000, "Motivasi terlalu panjang"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const Registration = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationForm) => {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzDB5VJaBuwruR0PgFwCx9o3hGlsAadSEe9u6MMfZ8UC0f_iC1tkc22d7Xej0th69TsmQ/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
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

            {/* Package */}
            <div className="space-y-2">
              <Label className="font-mono text-sm">
                Pilih Paket <span className="text-destructive">*</span>
              </Label>
              <Select onValueChange={(value) => setValue("package", value)}>
                <SelectTrigger className="bg-muted/50 border-border">
                  <SelectValue placeholder="Pilih paket bootcamp" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="self-paced">Self-Paced — Rp 4.500.000</SelectItem>
                  <SelectItem value="full">Full Bootcamp — Rp 8.900.000</SelectItem>
                  <SelectItem value="enterprise">Enterprise — Custom</SelectItem>
                </SelectContent>
              </Select>
              {errors.package && (
                <p className="text-xs text-destructive">{errors.package.message}</p>
              )}
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label htmlFor="motivation" className="font-mono text-sm">
                Motivasi <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="motivation"
                placeholder="Ceritakan mengapa kamu tertarik belajar cybersecurity..."
                className="min-h-[120px] bg-muted/50 border-border focus:border-primary"
                {...register("motivation")}
              />
              {errors.motivation && (
                <p className="text-xs text-destructive">{errors.motivation.message}</p>
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
