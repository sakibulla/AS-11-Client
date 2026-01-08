import { memo } from 'react';
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/loading.json";

/**
 * Loading Component
 * 
 * Professional loading indicator with Lottie animation
 * Used throughout the app for loading states
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Optional loading message
 * @param {string} props.size - Size variant: 'sm', 'md', 'lg'
 * @param {boolean} props.fullScreen - Whether to show full screen loading
 */
const Loading = memo(({ 
  message = "Loading...", 
  size = "md", 
  fullScreen = false 
}) => {
  const sizeClasses = {
    sm: "max-w-24",
    md: "max-w-32", 
    lg: "max-w-48"
  };

  const containerClasses = fullScreen 
    ? "fixed inset-0 bg-base-100/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center gap-4 p-8";

  return (
    <div className={containerClasses}>
      <div className={`${sizeClasses[size]} relative`}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
      
      {message && (
        <div className="text-center">
          <p className="text-base-content/70 font-medium">
            {message}
          </p>
          <div className="flex justify-center mt-2">
            <div className="loading loading-dots loading-sm text-primary"></div>
          </div>
        </div>
      )}
    </div>
  );
});

Loading.displayName = 'Loading';

export default Loading;