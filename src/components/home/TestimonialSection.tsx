
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialSection() {
  const testimonials = [
    {
      quote:
        "When my son had an allergic reaction and my husband was away, ParentConnect quickly connected me with a nurse who lived nearby. I'm so grateful for this network.",
      author: "Sarah M., Mother of 2",
    },
    {
      quote:
        "As a single dad, sometimes I need an extra hand. The community volunteers through ParentConnect have been lifesavers when I've needed assistance.",
      author: "David L., Father of 1",
    },
    {
      quote:
        "I was stranded with a flat tire while taking my daughter to a doctor's appointment. Within minutes, a helper from ParentConnect arrived to assist us.",
      author: "Michelle K., Mother of 3",
    },
  ];

  return (
    <div className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Parents Supporting Parents
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear from parents who have received help through our network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-4xl text-primary">"</div>
                  <p className="text-lg mb-4 flex-grow">
                    {testimonial.quote}
                  </p>
                  <div className="font-medium">
                    <p>{testimonial.author}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialSection;
