import connectDb from "@/db/connectDb";
import User from "@/models/User";
import Link from "next/link";

export const metadata = {
  title: 'Explore Creators | FuelMyWork',
  description: 'Discover talented creators and support their work.',
};

export default async function Creators() {
  await connectDb();
  
  // Fetch up to 100 users who have a username set
  const users = await User.find({ username: { $ne: null, $exists: true } }).limit(100);

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Discover Creators
          </h1>
          <p className="text-xl text-gray-600">
            Support the developers, artists, and writers you love.
          </p>
        </div>

        {/* Creators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center">
                
                {/* Profile Pic */}
                <div className="w-24 h-24 mb-4">
                   <img 
                     src={user.profilepic || "/avatar.gif"} 
                     alt={user.username}
                     className="rounded-full object-cover w-full h-full border-4 border-gray-100 shadow-sm"
                   />
                </div>
                
                {/* User Info */}
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">
                    {user.name}
                </h3>
                <p className="text-sm text-gray-500 mb-5 font-medium">
                    @{user.username}
                </p>
                
                {/* Action Button */}
                <Link href={`/${user.username}`} className="w-full mt-auto">
                  <button className="w-full bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                     <span>☕</span> Support
                  </button>
                </Link>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
                No creators found yet.
            </p>
          )}
        </div>

      </div>
    </div>
  );
}