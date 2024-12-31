import React, { Fragment } from 'react';

import { useMediaQuery } from '@/hooks/core/useMediaQuery.hook';

import NewAlertForm from './forms/NewAlertForm';

import { Seeker } from '@/types';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/layout/card';
import { Dialog } from '@/components/ui/layout/dialog';
import { Drawer } from '@/components/ui/layout/drawer';
import { Button } from '@/components/ui/buttons/button';
import { Separator } from '@/components/ui/layout/separator';

type SeekerAlertsProps = {
  alertsData: Pick<Seeker, 'alerts'>;
};

const SeekerAlerts: React.FC<SeekerAlertsProps> = React.memo(
  ({ alertsData }) => {
    const isSmall = useMediaQuery('(min-width: 650px)');
    const [isOpen, setIsOpen] = React.useState(false);

    const closeAlerts = () => setIsOpen(false);
    const openAlerts = () => setIsOpen(true);

    const { alerts } = alertsData;

    function areObjectKeysEmpty(obj: any) {
      if (obj == null || typeof obj !== 'object') {
        return true;
      }
      return !Object.values(obj).some((value) => value);
    }

    return (
      <Fragment>
        {isSmall && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <NewAlertForm
              alerts={alerts!}
              closeAlerts={closeAlerts}
              isDialog={true}
            />
          </Dialog>
        )}
        {!isSmall && (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <NewAlertForm
              alerts={alerts!}
              closeAlerts={closeAlerts}
              isDialog={false}
            />
          </Drawer>
        )}
        <Card>
          <CardHeader className="flex flex-col gap-5">
            <div className="flex justify-between gap-3">
              <div className="space-y-1.5">
                <CardTitle>Job Alerts</CardTitle>
                <CardDescription>
                  Receive alerts for job opportunities that match your
                  preferences
                </CardDescription>
              </div>
              {!areObjectKeysEmpty(alerts) && (
                <div>
                  <Button onClick={openAlerts} variant="default">
                    Edit Job Alerts
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <Separator />
          <CardContent>
            {areObjectKeysEmpty(alerts) ? (
              <div className="text-center flex flex-col gap-[10px]">
                <div>
                  <h1 className="text-base-black">No alert generated</h1>
                </div>
                <div>
                  <p className="text-muted-foreground text-base">
                    Consider enabling alerts to help you find the best job and
                    opportunity.
                  </p>
                </div>
                <div>
                  <Button onClick={openAlerts} variant="default">
                    Add New Alert
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border border-gray-100 bg-white p-3 rounded-lg dark:bg-[#0d0d0d] flex justify-between gap-8 dark:border-[#3b3b3b] overflow-auto whitespace-nowrap">
                {Array.from([
                  {
                    id: '1',
                    title: 'Job Title',
                    data: alerts?.title,
                  },
                  {
                    id: '2',
                    title: 'Job Type',
                    data: alerts?.type,
                  },
                  {
                    id: '3',
                    title: 'Job Level',
                    data: alerts?.level,
                  },
                ]).map((alertsInfoData) => (
                  <div key={alertsInfoData.id} className="flex flex-col gap-3">
                    <div>
                      <h1>{alertsInfoData.title}</h1>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {alertsInfoData?.data}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </Fragment>
    );
  },
);

export default SeekerAlerts;
