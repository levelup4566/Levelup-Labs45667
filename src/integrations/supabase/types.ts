export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          achievement_type: string | null
          created_at: string | null
          description: string | null
          icon_name: string | null
          id: string
          name: string
          points_required: number | null
        }
        Insert: {
          achievement_type?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          name: string
          points_required?: number | null
        }
        Update: {
          achievement_type?: string | null
          created_at?: string | null
          description?: string | null
          icon_name?: string | null
          id?: string
          name?: string
          points_required?: number | null
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          module_order: number
          subtitle: string | null
          title: string
          total_videos: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          module_order: number
          subtitle?: string | null
          title: string
          total_videos?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          module_order?: number
          subtitle?: string | null
          title?: string
          total_videos?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string
          estimated_duration_hours: number | null
          id: string
          title: string
          total_modules: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level: string
          estimated_duration_hours?: number | null
          id?: string
          title: string
          total_modules?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string
          estimated_duration_hours?: number | null
          id?: string
          title?: string
          total_modules?: number | null
        }
        Relationships: []
      }
      learning_streaks: {
        Row: {
          clerk_user_id: string
          created_at: string | null
          current_streak: number | null
          id: string
          last_activity_date: string | null
          longest_streak: number | null
          streak_start_date: string | null
          updated_at: string | null
        }
        Insert: {
          clerk_user_id: string
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_start_date?: string | null
          updated_at?: string | null
        }
        Update: {
          clerk_user_id?: string
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_activity_date?: string | null
          longest_streak?: number | null
          streak_start_date?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: string
          id: string
          rating: number | null
          resource_type: string | null
          tags: string[] | null
          title: string
          url: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty: string
          id?: string
          rating?: number | null
          resource_type?: string | null
          tags?: string[] | null
          title: string
          url: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: string
          id?: string
          rating?: number | null
          resource_type?: string | null
          tags?: string[] | null
          title?: string
          url?: string
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string | null
          clerk_user_id: string
          earned_at: string | null
          id: string
        }
        Insert: {
          achievement_id?: string | null
          clerk_user_id: string
          earned_at?: string | null
          id?: string
        }
        Update: {
          achievement_id?: string | null
          clerk_user_id?: string
          earned_at?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_color: string | null
          badge_description: string | null
          badge_icon: string | null
          badge_name: string
          clerk_user_id: string
          earned_at: string | null
          id: string
        }
        Insert: {
          badge_color?: string | null
          badge_description?: string | null
          badge_icon?: string | null
          badge_name: string
          clerk_user_id: string
          earned_at?: string | null
          id?: string
        }
        Update: {
          badge_color?: string | null
          badge_description?: string | null
          badge_icon?: string | null
          badge_name?: string
          clerk_user_id?: string
          earned_at?: string | null
          id?: string
        }
        Relationships: []
      }
      user_bookmarks: {
        Row: {
          clerk_user_id: string
          created_at: string | null
          id: string
          resource_id: string | null
        }
        Insert: {
          clerk_user_id: string
          created_at?: string | null
          id?: string
          resource_id?: string | null
        }
        Update: {
          clerk_user_id?: string
          created_at?: string | null
          id?: string
          resource_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_bookmarks_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      user_course_enrollments: {
        Row: {
          clerk_user_id: string
          completed_at: string | null
          course_id: string
          created_at: string | null
          id: string
          is_favorite: boolean | null
          last_accessed_at: string | null
          progress_percentage: number | null
          started_at: string | null
        }
        Insert: {
          clerk_user_id: string
          completed_at?: string | null
          course_id: string
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          progress_percentage?: number | null
          started_at?: string | null
        }
        Update: {
          clerk_user_id?: string
          completed_at?: string | null
          course_id?: string
          created_at?: string | null
          id?: string
          is_favorite?: boolean | null
          last_accessed_at?: string | null
          progress_percentage?: number | null
          started_at?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          clerk_user_id: string
          created_at: string | null
          experience_level: string | null
          id: string
          learning_goal: string | null
          time_commitment: string | null
          updated_at: string | null
        }
        Insert: {
          clerk_user_id: string
          created_at?: string | null
          experience_level?: string | null
          id?: string
          learning_goal?: string | null
          time_commitment?: string | null
          updated_at?: string | null
        }
        Update: {
          clerk_user_id?: string
          created_at?: string | null
          experience_level?: string | null
          id?: string
          learning_goal?: string | null
          time_commitment?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          clerk_user_id: string
          completed: boolean | null
          completed_at: string | null
          course_id: string | null
          created_at: string | null
          id: string
          module_id: string | null
          time_spent_minutes: number | null
          video_id: string | null
        }
        Insert: {
          clerk_user_id: string
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          time_spent_minutes?: number | null
          video_id?: string | null
        }
        Update: {
          clerk_user_id?: string
          completed?: boolean | null
          completed_at?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          module_id?: string | null
          time_spent_minutes?: number | null
          video_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_progress_video_id_fkey"
            columns: ["video_id"]
            isOneToOne: false
            referencedRelation: "videos"
            referencedColumns: ["id"]
          },
        ]
      }
      user_resource_ratings: {
        Row: {
          clerk_user_id: string
          created_at: string | null
          id: string
          rating: number | null
          resource_id: string | null
        }
        Insert: {
          clerk_user_id: string
          created_at?: string | null
          id?: string
          rating?: number | null
          resource_id?: string | null
        }
        Update: {
          clerk_user_id?: string
          created_at?: string | null
          id?: string
          rating?: number | null
          resource_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_resource_ratings_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          clerk_user_id: string
          created_at: string | null
          id: string
          skill_level: number | null
          skill_name: string
          skill_points: number | null
          updated_at: string | null
        }
        Insert: {
          clerk_user_id: string
          created_at?: string | null
          id?: string
          skill_level?: number | null
          skill_name: string
          skill_points?: number | null
          updated_at?: string | null
        }
        Update: {
          clerk_user_id?: string
          created_at?: string | null
          id?: string
          skill_level?: number | null
          skill_name?: string
          skill_points?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      user_stats: {
        Row: {
          clerk_user_id: string
          courses_completed: number | null
          created_at: string | null
          current_level: number | null
          experience_points: number | null
          id: string
          is_new_user: boolean | null
          login_streak_days: number | null
          points_to_next_level: number | null
          total_skill_points: number | null
          total_study_time_minutes: number | null
          updated_at: string | null
          videos_watched: number | null
        }
        Insert: {
          clerk_user_id: string
          courses_completed?: number | null
          created_at?: string | null
          current_level?: number | null
          experience_points?: number | null
          id?: string
          is_new_user?: boolean | null
          login_streak_days?: number | null
          points_to_next_level?: number | null
          total_skill_points?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          videos_watched?: number | null
        }
        Update: {
          clerk_user_id?: string
          courses_completed?: number | null
          created_at?: string | null
          current_level?: number | null
          experience_points?: number | null
          id?: string
          is_new_user?: boolean | null
          login_streak_days?: number | null
          points_to_next_level?: number | null
          total_skill_points?: number | null
          total_study_time_minutes?: number | null
          updated_at?: string | null
          videos_watched?: number | null
        }
        Relationships: []
      }
      videos: {
        Row: {
          created_at: string | null
          duration: string | null
          id: string
          module_id: string | null
          title: string
          video_order: number
          video_url: string | null
        }
        Insert: {
          created_at?: string | null
          duration?: string | null
          id?: string
          module_id?: string | null
          title: string
          video_order: number
          video_url?: string | null
        }
        Update: {
          created_at?: string | null
          duration?: string | null
          id?: string
          module_id?: string | null
          title?: string
          video_order?: number
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      award_points: {
        Args: { user_id: string; points: number; activity_desc?: string }
        Returns: undefined
      }
      complete_onboarding: {
        Args: {
          user_id: string
          learning_goal: string
          experience_level: string
          time_commitment: string
        }
        Returns: undefined
      }
      initialize_new_user: {
        Args: { user_id: string }
        Returns: undefined
      }
      update_learning_streak: {
        Args: { user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
