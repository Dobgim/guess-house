import React, { useState } from 'react';
import { Star, ThumbsUp, Send } from 'lucide-react';
import { Layout } from '../components/Layout';
import { REVIEWS } from '../data/mockData';

export const Reviews: React.FC = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const avgRating = REVIEWS.reduce((acc, r) => acc + r.rating, 0) / REVIEWS.length;
  const ratingDist = [5, 4, 3, 2, 1].map((n) => ({
    stars: n,
    count: REVIEWS.filter((r) => r.rating === n).length,
    percent: (REVIEWS.filter((r) => r.rating === n).length / REVIEWS.length) * 100,
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() && name.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <Layout>
      <section id="reviews-header" className="bg-charcoal pt-10 pb-16 text-center">
        <p className="text-gold text-sm font-semibold uppercase tracking-widest mb-3">Guest Feedback</p>
        <h1 className="font-serif text-5xl font-semibold text-cream-light mb-4">Guest Reviews</h1>
        <p className="text-cream-dark/65 max-w-xl mx-auto">
          Authentic feedback from guests who have experienced La Villa Rielle firsthand.
        </p>
      </section>

      <section id="reviews-body" className="py-16 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Aggregate Score */}
          <div id="review-aggregate" className="bg-cream-light rounded-2xl p-8 border border-gold/15 mb-12 flex flex-col md:flex-row items-center gap-10">
            <div className="text-center shrink-0">
              <p className="font-serif text-7xl font-bold text-gold">{avgRating.toFixed(1)}</p>
              <div className="flex justify-center gap-0.5 my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < Math.round(avgRating) ? 'fill-gold text-gold' : 'fill-gold/20 text-gold/20'}`} />
                ))}
              </div>
              <p className="text-charcoal-light text-sm">Based on {REVIEWS.length} reviews</p>
            </div>
            {/* Distribution */}
            <div className="flex-grow w-full space-y-2">
              {ratingDist.map(({ stars, count, percent }) => (
                <div key={stars} className="flex items-center gap-3 text-sm">
                  <span className="text-charcoal-light w-4 shrink-0">{stars}</span>
                  <Star className="w-3.5 h-3.5 fill-gold text-gold shrink-0" />
                  <div className="flex-grow h-2 bg-cream-dark rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="text-charcoal-light w-4 shrink-0 text-right">{count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div id="reviews-list" className="space-y-5 mb-16">
            {REVIEWS.map((review) => (
              <div key={review.id} className="bg-cream-light rounded-2xl p-6 border border-gold/10 hover:border-gold/25 hover:shadow-md transition-all duration-300">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/30 to-sage/30 flex items-center justify-center font-serif font-bold text-charcoal">
                      {review.author[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-charcoal text-sm">{review.author}</p>
                      <p className="text-charcoal-light text-xs">{review.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-gold text-gold' : 'fill-gold/15 text-gold/15'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-charcoal-light">{new Date(review.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <p className="text-charcoal-light text-sm leading-relaxed italic">"{review.comment}"</p>
                <div className="flex items-center gap-1 mt-3 text-sage text-xs">
                  <ThumbsUp className="w-3 h-3" /> Verified Guest
                </div>
              </div>
            ))}
          </div>

          {/* Submit Review */}
          <div id="submit-review" className="bg-charcoal rounded-2xl p-8 border border-gold/15">
            <h2 className="font-serif text-2xl font-semibold text-cream-light mb-6">Leave a Review</h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                  <ThumbsUp className="w-8 h-8 text-gold" />
                </div>
                <p className="text-cream-light font-serif text-xl">Thank you for your review, {name}!</p>
                <p className="text-cream-dark/60 text-sm mt-2">Your feedback helps future guests make confident booking decisions.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-gold font-semibold uppercase tracking-wider">Your Rating *</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button key={star} type="button" id={`star-${star}`}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                        className="focus:outline-none">
                        <Star className={`w-8 h-8 transition-all ${(hover || rating) >= star ? 'fill-gold text-gold scale-110' : 'fill-gold/20 text-gold/20'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold font-semibold uppercase tracking-wider">Your Name *</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jean Dupont"
                    className="bg-charcoal-light border border-gold/20 text-cream-light placeholder-cream-dark/40 px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold text-sm" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gold font-semibold uppercase tracking-wider">Your Review *</label>
                  <textarea required value={comment} onChange={(e) => setComment(e.target.value)}
                    rows={4} placeholder="Share your experience at La Villa Rielle…"
                    className="bg-charcoal-light border border-gold/20 text-cream-light placeholder-cream-dark/40 px-4 py-2.5 rounded-xl focus:outline-none focus:border-gold text-sm resize-none" />
                </div>
                <button type="submit" id="submit-review-btn"
                  disabled={rating === 0}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-cream-light px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow disabled:bg-gold/40 disabled:cursor-not-allowed">
                  <Send className="w-4 h-4" /> Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};
