export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      medical_expenses: {
        Row: {
          created_at: string;
          id: string;
          medical_visit_id: string;
          pet_id: string;
          price: number;
          service: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          medical_visit_id: string;
          pet_id: string;
          price: number;
          service: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          medical_visit_id?: string;
          pet_id?: string;
          price?: number;
          service?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medical_expenses_medical_visit_id_fkey";
            columns: ["medical_visit_id"];
            isOneToOne: false;
            referencedRelation: "medical_visits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "medical_expenses_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
      medical_visits: {
        Row: {
          content: string;
          created_at: string;
          hospital_name: string;
          id: string;
          next_visit_date: string | null;
          pet_id: string;
          title: string;
          visit_date: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          hospital_name: string;
          id?: string;
          next_visit_date?: string | null;
          pet_id: string;
          title: string;
          visit_date: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          hospital_name?: string;
          id?: string;
          next_visit_date?: string | null;
          pet_id?: string;
          title?: string;
          visit_date?: string;
        };
        Relationships: [
          {
            foreignKeyName: "medical_visits_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
      pet_details: {
        Row: {
          animal_type: string;
          birth_date: string;
          created_at: string;
          gender: string;
          id: string;
          images: string;
          neutered: string;
          pet_id: string;
          weight: string;
        };
        Insert: {
          animal_type: string;
          birth_date: string;
          created_at?: string;
          gender: string;
          id?: string;
          images: string;
          neutered: string;
          pet_id: string;
          weight: string;
        };
        Update: {
          animal_type?: string;
          birth_date?: string;
          created_at?: string;
          gender?: string;
          id?: string;
          images?: string;
          neutered?: string;
          pet_id?: string;
          weight?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pet_details_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
      pet_list: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pet_list_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      symptoms: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          images: string | null;
          pet_id: string;
          symptom_date: string;
          title: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          images?: string | null;
          pet_id: string;
          symptom_date: string;
          title: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          images?: string | null;
          pet_id?: string;
          symptom_date?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "symptoms_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          created_at: string;
          id: string;
          nickname: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          nickname: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          nickname?: string;
        };
        Relationships: [];
      };

      vaccinations: {
        Row: {
          created_at: string;
          hospital_name: string;
          id: string;
          note: string | null;
          pet_id: string;
          price: number;
          vaccination_date: string;
          vaccine_name: string;
        };
        Insert: {
          created_at?: string;
          hospital_name: string;
          id?: string;
          note?: string | null;
          pet_id: string;
          price: number;
          vaccination_date: string;
          vaccine_name: string;
        };
        Update: {
          created_at?: string;
          hospital_name?: string;
          id?: string;
          note?: string | null;
          pet_id?: string;
          price?: number;
          vaccination_date?: string;
          vaccine_name?: string;
        };
        Relationships: [
          {
            foreignKeyName: "vaccinations_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
      weight_records: {
        Row: {
          created_at: string;
          id: string;
          measured_at: string;
          pet_id: string;
          weight: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          measured_at: string;
          pet_id: string;
          weight: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          measured_at?: string;
          pet_id?: string;
          weight?: string;
        };
        Relationships: [
          {
            foreignKeyName: "weight_records_pet_id_fkey";
            columns: ["pet_id"];
            isOneToOne: false;
            referencedRelation: "pet_list";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
  ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;
