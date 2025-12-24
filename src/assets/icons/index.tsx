import { FaFacebook, FaGithub, FaLinkedin, FaXmark, FaYoutube, FaXTwitter, FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaPlus, FaPenToSquare, FaTrash, FaMagnifyingGlass, FaFilter, FaSun, FaMoon, FaImage, FaStar, FaArrowLeft, FaArrowRight, FaCheck, FaXmark as FaTimes, FaCircleInfo, FaCircleExclamation, FaTriangleExclamation, FaCalendarDays, FaHeart, FaShield, FaBolt, FaPalette, FaMobile, FaWandMagicSparkles, FaGears, FaRobot, FaHouse, FaDoorOpen, FaBox, FaCreditCard, FaBrain, FaComments, FaChartLine, FaRocket } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";


// Menu Icons
export const MenuIcon = IoMenu
export const CloseIcon = FaXmark

// Social Media Icons
export const GoogleIcon = FaGoogle
export const GitHubIcon = FaGithub
export const FacebookIcon = FaFacebook
export const LinkedinIcon = FaLinkedin
export const YouTubeIcon = FaYoutube
export const XIcon = FaXTwitter

// Auth Icons
export const UserIcon = FaUser
export const EnvelopeIcon = FaEnvelope
export const LockIcon = FaLock
export const EyeIcon = FaEye
export const EyeSlashIcon = FaEyeSlash

// CRUD Operation Icons
export const AddIcon = FaPlus
export const EditIcon = FaPenToSquare
export const DeleteIcon = FaTrash
export const CheckIcon = FaCheck
export const CancelIcon = FaTimes

// Search & Filter Icons
export const SearchIcon = FaMagnifyingGlass
export const FilterIcon = FaFilter

// Theme Icons
export const SunIcon = FaSun
export const MoonIcon = FaMoon

// Other Icons
export const ImageIcon = FaImage
export const StarIcon = FaStar
export const ArrowLeft = FaArrowLeft
export const ArrowRight = FaArrowRight
export const CalendarIcon = FaCalendarDays

// Alert Icons
export const InfoIcon = FaCircleInfo
export const WarningIcon = FaTriangleExclamation
export const ErrorIcon = FaCircleExclamation

// features icons
export const BrainIcon = FaBrain
export const CommentsIcon = FaComments
export const EyeIcon2 = FaEye
export const ChartIcon = FaChartLine

// Additional Icons
export const HeartIcon = FaHeart
export const ShieldIcon = FaShield
export const BoltIcon = FaBolt
export const PaletteIcon = FaPalette
export const MobileIcon = FaMobile
export const MagicIcon = FaWandMagicSparkles
export const SettingsIcon = FaGears
export const RobotIcon = FaRobot
export const HomeIcon = FaHouse
export const DoorIcon = FaDoorOpen
export const PackageIcon = FaBox
export const CreditCardIcon = FaCreditCard
export const RocketIcon = FaRocket

// Model Action Icons
export const DatasetIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
);

export const PurchaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
    </svg>
);

export const LoadingIcon = () =>
    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>



