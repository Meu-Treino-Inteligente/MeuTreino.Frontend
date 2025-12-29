"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserTie,
  faEnvelope,
  faSpinner,
  faCheckCircle,
  faArrowLeft,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { HeaderNavigation } from "../components/header-navigation/header-navigation";
import { FooterSection } from "../components/footer-section/footer-section";
import Link from "next/link";

export default function InfluencerPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    instagram: "",
    followers: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.instagram.trim()) {
      newErrors.instagram = "Instagram é obrigatório";
    }

    if (!formData.followers.trim()) {
      newErrors.followers = "Número de seguidores é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    // Simular envio (aqui você integraria com sua API)
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
        <HeaderNavigation />
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-4xl text-green-600"
              />
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3">
              Solicitação Enviada!
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              Entraremos em contato em até 48 horas.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all text-sm"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              Voltar
            </Link>
          </div>
        </div>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900">
      <HeaderNavigation />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors text-sm"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="text-xs" />
              <span>Voltar</span>
            </Link>

            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={faUserTie}
                className="text-2xl text-white"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
              Solicite Seu Cupom
            </h1>
            <p className="text-gray-600 text-sm mb-4">
              Ganhe 20% de comissão a cada venda realizada com seu cupom
            </p>
            <Link
              href="/influencer/coupons"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-semibold text-sm transition-colors"
            >
              <FontAwesomeIcon icon={faInfoCircle} className="text-xs" />
              <span>Saiba como funciona</span>
            </Link>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-xl"
          >
            <div className="space-y-4">
              {/* Nome */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Nome <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Seu nome"
                  className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
                    errors.name
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    className={`w-full pl-10 pr-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
                      errors.email
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Instagram */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Instagram <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="@seuinstagram"
                  className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
                    errors.instagram
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  }`}
                />
                {errors.instagram && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.instagram}
                  </p>
                )}
              </div>

              {/* Seguidores */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Seguidores <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="followers"
                  value={formData.followers}
                  onChange={handleChange}
                  placeholder="50.000"
                  className={`w-full px-3 py-2.5 bg-gray-50 border-2 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-sm ${
                    errors.followers
                      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                  }`}
                />
                {errors.followers && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.followers}
                  </p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-gray-900 font-semibold mb-1.5 text-sm">
                  Mensagem (opcional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mensagem..."
                  rows={3}
                  className="w-full px-3 py-2.5 bg-gray-50 border-2 border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <>
                    <FontAwesomeIcon
                      icon={faSpinner}
                      className="animate-spin text-xs"
                    />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <span>Solicitar</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <FooterSection />
    </div>
  );
}
