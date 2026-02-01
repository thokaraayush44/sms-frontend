import { User, Mail, Phone, MapPin, Briefcase, Camera } from 'lucide-react';

const Profile = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="page-header">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="card p-8 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-500 to-indigo-600 p-1">
                            <div className="w-full h-full rounded-full bg-white dark:bg-dark-800 flex items-center justify-center overflow-hidden">
                                <span className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-indigo-600 bg-clip-text text-transparent">
                                    AD
                                </span>
                            </div>
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-dark-700 rounded-full shadow-lg border border-slate-200 dark:border-dark-600 text-primary-600 hover:text-primary-700 transition-colors">
                            <Camera className="w-5 h-5" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Admin User</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">Administrator</p>

                    <div className="w-full grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                            <div className="text-lg font-bold text-slate-900 dark:text-white">5+</div>
                            <div className="text-xs text-slate-500">Years</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-slate-900 dark:text-white">12</div>
                            <div className="text-xs text-slate-500">Awards</div>
                        </div>
                        <div className="text-center">
                            <div className="text-lg font-bold text-slate-900 dark:text-white">45</div>
                            <div className="text-xs text-slate-500">Projects</div>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <button className="w-full btn-primary">Edit Profile</button>
                        <button className="w-full btn-secondary">Change Password</button>
                    </div>
                </div>

                {/* Details Card */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <h3 className="section-title text-lg mb-6">Personal Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="label-text text-xs uppercase text-slate-500 mb-1">Full Name</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-700/50 rounded-xl">
                                    <User className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-900 dark:text-white">Admin User</span>
                                </div>
                            </div>
                            <div>
                                <label className="label-text text-xs uppercase text-slate-500 mb-1">Email Address</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-700/50 rounded-xl">
                                    <Mail className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-900 dark:text-white">admin@edumanage.com</span>
                                </div>
                            </div>
                            <div>
                                <label className="label-text text-xs uppercase text-slate-500 mb-1">Phone Number</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-700/50 rounded-xl">
                                    <Phone className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-900 dark:text-white">+1 (555) 123-4567</span>
                                </div>
                            </div>
                            <div>
                                <label className="label-text text-xs uppercase text-slate-500 mb-1">Location</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-700/50 rounded-xl">
                                    <MapPin className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-900 dark:text-white">New York, USA</span>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="label-text text-xs uppercase text-slate-500 mb-1">Role</label>
                                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-dark-700/50 rounded-xl">
                                    <Briefcase className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium text-slate-900 dark:text-white">Senior System Administrator</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="section-title text-lg mb-6">Account Settings</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-dark-700 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Email Notifications</h4>
                                    <p className="text-sm text-slate-500">Receive updates about system activities</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-slate-200 dark:border-dark-700 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-slate-900 dark:text-white">Two-Factor Authentication</h4>
                                    <p className="text-sm text-slate-500">Add an extra layer of security</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
