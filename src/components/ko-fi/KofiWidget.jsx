import { useEffect } from 'react';

const KofiWidget = () => {
  useEffect(() => {
    // Create the script tag
    const script = document.createElement('script');
    script.src = 'https://storage.ko-fi.com/cdn/scripts/overlay-widget.js';
    script.async = true;

    // Append the script to the body
    document.body.appendChild(script);

    // Initialize the widget once the script is loaded
    script.onload = () => {
      if (window.kofiWidgetOverlay) {
        window.kofiWidgetOverlay.draw('mattyo', {
          type: 'floating-chat',
          'floating-chat.donateButton.text': 'Support me',
          'floating-chat.donateButton.background-color': '#00b9fe',
          'floating-chat.donateButton.text-color': '#fff',
        });
      }
    };

    // Cleanup to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // No UI needed; it's just adding a script
};

export default KofiWidget;