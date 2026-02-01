const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="glass-effect border-t border-slate-200 dark:border-dark-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              © {currentYear} <span className="font-semibold gradient-text">EduManage</span>. All rights reserved.
            </p>
          </div>
          
          <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;