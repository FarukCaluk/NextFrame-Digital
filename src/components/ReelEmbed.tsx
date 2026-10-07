export default function ReelEmbed({ id, title }: { id: string; title: string }) {
  return (
    <div className="relative aspect-[9/16] overflow-hidden bg-surface">
      <iframe
        src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
          `https://www.facebook.com/reel/${id}/`
        )}&show_text=false&width=267`}
        title={title}
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
