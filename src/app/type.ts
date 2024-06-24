export interface TProduct {
  id: number;
  media_url: string;
  featured_image_url: string;
  get_absolute_url: string;
  product_tags: string[];
  public_name: string;
  card_description: string;
  slug: string;
  is_marketplace: boolean;
  browse_deal_status: string;
  shows_codes_remaining: boolean;
  codes_remaining: number;
  has_started: boolean;
  has_ended: boolean;
  active_timer: boolean;
  participation: string[];
  unique_plan_types: [string | null | undefined];
  story_images: {
    is_active: boolean;
    alt_text: string;
    slug: string;
    url: string;
    order: number;
  }[];
  common_features: {
    is_active: boolean;
    feature: string;
    order: number;
  }[];
  default_plan: {
    plan_type: string;
    quantity: number;
    price: number;
    id: number;
  };
  internal_tags: string[];
  freebie_downloads_total: number;
  price: number;
  original_price: number;
  is_free: boolean;
  dates: {
    start_date: string;
    end_date: string | null;
  };
  buy_button: {
    is_coming_soon: boolean;
    is_last_call: boolean;
  };
  deal_review: {
    review_count: number;
    average_rating: number;
  };
  taxonomy: {
    subcategory: {
      value_enumeration: string;
      search_values: string[];
      slug: string;
    };
    category: {
      value_enumeration: string;
      search_values: string[];
      slug: string;
    };
    group: {
      value_enumeration: string;
      search_values: string[];
      slug: string;
    };
  };
  attributes: {
    alternative_to: string[];
    integrations: string[];
    best_for: string[];
    existing_accounts: any; // Adjust if it's not always null
    features: string[];
    os: string[];
    product_tag: string[];
    subcategory: string[];
    category: string[];
    group: string[];
  };
  listing_type: string;
  search_after: [number, number, number];
  rgb_background_color: string;
  total_votes_count: number;
  has_user_voted: boolean;
}
