export type Locale = "en" | "ar" | "es" | "fr";

export type Role = "TRADER" | "INSTRUCTOR" | "ADMIN";
export type SubscriptionTier = "FREE" | "PREMIUM";
export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type CourseCategory =
  | "BASICS"
  | "FOREX"
  | "CRYPTO"
  | "STOCKS"
  | "RISK_MANAGEMENT"
  | "TECHNICAL_ANALYSIS"
  | "FUNDAMENTAL_ANALYSIS"
  | "PSYCHOLOGY"
  | "OPTIONS"
  | "COMMODITIES";

export type LessonType = "VIDEO" | "TEXT" | "QUIZ";
export type CertificateStatus = "ISSUED" | "PRINTING" | "SHIPPED" | "DELIVERED";
export type BrokerRegulation =
  | "FCA"
  | "ASIC"
  | "CySEC"
  | "NFA"
  | "FSCA"
  | "SEC"
  | "OTHER"
  | "UNREGULATED";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED";
export type FundRecoveryStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "IN_PROGRESS"
  | "RESOLVED"
  | "CLOSED";

export interface User {
  id: string;
  email: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  bio?: string;
  country?: string;
  role: Role;
  subscription: SubscriptionTier;
  subscriptionEndsAt?: string;
  isVerifiedTrader: boolean;
  createdAt: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  titleAr?: string;
  titleEs?: string;
  titleFr?: string;
  description: string;
  thumbnailUrl?: string;
  previewVideoUrl?: string;
  category: CourseCategory;
  level: CourseLevel;
  isPremium: boolean;
  isPublished: boolean;
  totalDuration: number;
  totalLessons: number;
  instructor?: string;
  tags: string[];
  modules?: Module[];
  createdAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  sortOrder: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  type: LessonType;
  content?: string;
  videoUrl?: string;
  duration?: number;
  isFree: boolean;
  sortOrder: number;
  quiz?: Quiz;
  isCompleted?: boolean;
}

export interface Quiz {
  id: string;
  lessonId: string;
  passMark: number;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: QuizOption[];
  sortOrder: number;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  completedAt?: string;
  progressPct: number;
  course?: Course;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateCode: string;
  issuedAt: string;
  status: CertificateStatus;
  shippingAddress?: ShippingAddress;
  trackingNumber?: string;
  shippedAt?: string;
  deliveredAt?: string;
  course?: Course;
}

export interface ShippingAddress {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Broker {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
  description: string;
  regulation: BrokerRegulation;
  regulatoryBody?: string;
  licenseNumber?: string;
  founded?: number;
  headquarters?: string;
  minDeposit?: number;
  maxLeverage?: string;
  spreadsFrom?: number;
  platforms: string[];
  instruments: string[];
  withdrawalMethods: string[];
  customerSupportHours?: string;
  isVerified: boolean;
  isFeatured: boolean;
  isBlacklisted: boolean;
  overallRating: number;
  totalReviews: number;
  ratingTrustScore: number;
  ratingPlatform: number;
  ratingSupport: number;
  ratingFees: number;
  ratingWithdrawal: number;
  createdAt: string;
}

export interface BrokerReview {
  id: string;
  brokerId: string;
  userId: string;
  title: string;
  content: string;
  rating: number;
  ratingTrust: number;
  ratingPlatform: number;
  ratingSupport: number;
  ratingFees: number;
  ratingWithdrawal: number;
  tradingExperience?: number;
  accountType?: string;
  country?: string;
  status: ReviewStatus;
  isVerified: boolean;
  helpfulCount: number;
  createdAt: string;
  user?: Pick<User, "id" | "name" | "avatarUrl" | "country">;
}

export interface DashboardStats {
  enrolled: number;
  completed: number;
  certificates: number;
  savedBrokers: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
