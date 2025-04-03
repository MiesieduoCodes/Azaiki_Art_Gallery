"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import { ref, update } from "firebase/database";
import { database } from "@/lib/firebase/config";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref");
  const artworkId = searchParams.get("artwork_id");

  // Mark artwork as sold in database after successful payment
  useEffect(() => {
    if (artworkId) {
      const artworkRef = ref(database, `artworks/${artworkId}`);
      update(artworkRef, { sold: true })
        .then(() => console.log("Artwork marked as sold"))
        .catch((error) => console.error("Error updating artwork:", error));
    }
  }, [artworkId]);

  return (
    <div className="container mx-auto pt-28 py-16 px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        <p className="text-lg mb-6">
          Thank you for your purchase. Your transaction has been completed successfully.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Order Details</h3>
          {txRef && (
            <p className="text-sm text-gray-600">
              Transaction reference: <span className="font-mono">{txRef}</span>
            </p>
          )}
          {artworkId && (
            <p className="text-sm text-gray-600 mt-2">
              Artwork ID: <span className="font-mono">{artworkId}</span>
            </p>
          )}
        </div>

        <div className="space-y-3">
          <Button asChild className="w-full">
            <Link href="/gallery">Back to Gallery</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/account/orders">View Your Orders</Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>A confirmation email has been sent to your registered email address.</p>
          <p className="mt-2">For any questions, please contact our support team.</p>
        </div>
      </div>
    </div>
  );
}