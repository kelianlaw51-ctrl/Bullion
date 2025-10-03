require('dotenv').config({ path: '.env.local' });
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function migrateTrackingCodes() {
  try {
    console.log('Starting migration of tracking codes from BULL- to BC-...');
    
    // Find all shipments with BULL- prefix
    const shipmentsToUpdate = await prisma.shipment.findMany({
      where: {
        trackingCode: {
          startsWith: 'BULL-'
        }
      },
      select: {
        id: true,
        trackingCode: true
      }
    });

    console.log(`Found ${shipmentsToUpdate.length} shipments to update.`);

    if (shipmentsToUpdate.length === 0) {
      console.log('No shipments found with BULL- prefix. Migration complete.');
      return;
    }

    // Update each shipment
    for (const shipment of shipmentsToUpdate) {
      const newTrackingCode = shipment.trackingCode.replace('BULL-', 'BC-');
      
      await prisma.shipment.update({
        where: { id: shipment.id },
        data: { trackingCode: newTrackingCode }
      });

      console.log(`Updated ${shipment.trackingCode} → ${newTrackingCode}`);
    }

    console.log(`✅ Successfully updated ${shipmentsToUpdate.length} tracking codes.`);
    
  } catch (error) {
    console.error('❌ Error during migration:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateTrackingCodes();
