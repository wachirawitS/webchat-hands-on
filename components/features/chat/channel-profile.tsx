'use client'

import { useEffect, useState } from 'react'


const ChannelProfile = () => {
  // const [profile, setProfile] = useState<ChannelData | null>(null)
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await fetch('/api/line-oa/get-profile')
  //       if (res.ok) {
  //         const data = await res.json()
  //         console.log('Channel profile data:', data)
  //         setProfile(data)
  //       }
  //     } catch (error) {
  //       console.error('Failed to fetch channel profile:', error)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProfile()
  // }, [])

  // if (loading) return <div>Loading channel...</div>
  // if (!profile) return <div>No channel data</div>

  return (
    <div className="flex items-center gap-3">
      {/* {profile.pictureUrl && (
        <img
          src={profile.pictureUrl}
          alt={profile.displayName ?? 'Channel'}
          className="h-10 w-10 rounded-full"
        />
      )} */}
      <div>
        {/* <div className="font-semibold">{profile.displayName ?? 'LINE OA'}</div> */}
        {/* {profile.basicId && (
          <div className="text-sm text-muted-foreground">{profile.basicId}</div>
        )} */}
      </div>
    </div>
  )
}

export default ChannelProfile
